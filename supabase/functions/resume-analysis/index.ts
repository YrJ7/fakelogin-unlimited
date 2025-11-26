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
    const { resumeText, jobRequirements, jobTitle } = await req.json();

    if (!resumeText || !jobRequirements) {
      return new Response(
        JSON.stringify({ error: 'Resume text and job requirements are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = `Analyze this resume against the job requirements and provide:
1. A match score (0-100%)
2. Key skills found in the resume
3. Matching skills with job requirements
4. Missing skills
5. Overall assessment

Job Title: ${jobTitle}
Job Requirements: ${jobRequirements}

Resume:
${resumeText}

Respond in JSON format with: { matchScore, skills, matchingSkills, missingSkills, assessment }`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert HR recruiter and resume analyzer. Provide detailed, accurate analysis in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Groq API error:', error);
      throw new Error('Failed to analyze resume with Groq AI');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch {
      // If not valid JSON, create structured response
      analysis = {
        matchScore: 'N/A',
        skills: [],
        matchingSkills: [],
        missingSkills: [],
        assessment: content
      };
    }

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Resume analysis error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});