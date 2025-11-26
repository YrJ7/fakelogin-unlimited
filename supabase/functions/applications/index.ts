import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { MongoClient, ObjectId } from "https://deno.land/x/mongo@v0.32.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const client = new MongoClient();
    await client.connect(Deno.env.get('MONGODB_URI')!);
    const db = client.database('interviewz');
    const applications = db.collection('applications');

    if (req.method === 'GET') {
      const allApplications = await applications.find({}).toArray();
      return new Response(
        JSON.stringify(allApplications),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST') {
      const body = await req.json();
      
      if (body.action === 'create') {
        const result = await applications.insertOne({
          jobId: body.jobId,
          jobPosition: body.jobPosition,
          company: body.company,
          candidate: body.candidate || 'Anonymous',
          candidateEmail: body.candidateEmail,
          resumeUrl: body.resumeUrl,
          matchScore: body.matchScore || 'N/A',
          aiAnalysis: body.aiAnalysis,
          interviewStatus: 'Not Started',
          status: 'Under Review',
          appliedDate: new Date().toISOString(),
          createdAt: new Date(),
        });

        return new Response(
          JSON.stringify({ id: result, ...body }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (body.action === 'update') {
        const { id, ...updates } = body;
        
        await applications.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updates, updatedAt: new Date() } }
        );

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Invalid request' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Applications error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});