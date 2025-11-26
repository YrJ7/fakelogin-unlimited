import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audioUrl, audioBase64 } = await req.json();

    if (!audioUrl && !audioBase64) {
      return new Response(
        JSON.stringify({ error: 'Audio URL or base64 data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let uploadResponse;

    if (audioBase64) {
      // Upload base64 audio to AssemblyAI
      const audioBuffer = Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0));
      
      uploadResponse = await fetch('https://api.assemblyai.com/v2/upload', {
        method: 'POST',
        headers: {
          'authorization': Deno.env.get('ASSEMBLYAI_API_KEY')!,
        },
        body: audioBuffer,
      });
    }

    const uploadData = audioBase64 ? await uploadResponse!.json() : null;
    const audioUrlToTranscribe = audioBase64 ? uploadData.upload_url : audioUrl;

    // Request transcription
    const transcriptResponse = await fetch('https://api.assemblyai.com/v2/transcript', {
      method: 'POST',
      headers: {
        'authorization': Deno.env.get('ASSEMBLYAI_API_KEY')!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        audio_url: audioUrlToTranscribe,
        speaker_labels: true,
      }),
    });

    const transcriptData = await transcriptResponse.json();
    const transcriptId = transcriptData.id;

    // Poll for completion
    let transcript;
    while (true) {
      const pollingResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          'authorization': Deno.env.get('ASSEMBLYAI_API_KEY')!,
        },
      });

      transcript = await pollingResponse.json();

      if (transcript.status === 'completed') {
        break;
      } else if (transcript.status === 'error') {
        throw new Error(`Transcription failed: ${transcript.error}`);
      }

      // Wait 3 seconds before polling again
      await new Promise(resolve => setTimeout(resolve, 3000));
    }

    return new Response(
      JSON.stringify({
        text: transcript.text,
        words: transcript.words,
        utterances: transcript.utterances,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Voice transcription error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});