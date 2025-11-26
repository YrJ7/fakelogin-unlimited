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
    const jobs = db.collection('jobs');

    if (req.method === 'GET') {
      const allJobs = await jobs.find({}).toArray();
      return new Response(
        JSON.stringify(allJobs),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (req.method === 'POST') {
      const body = await req.json();
      
      if (body.action === 'create') {
        const { title, company, skills, location, expiryDate, description, requirements } = body;
        
        const result = await jobs.insertOne({
          title,
          company,
          skills,
          location,
          expiryDate,
          description,
          requirements,
          status: 'Active',
          expired: false,
          createdAt: new Date(),
        });

        return new Response(
          JSON.stringify({ id: result, ...body }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (body.action === 'update') {
        const { id, ...updates } = body;
        
        await jobs.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updates, updatedAt: new Date() } }
        );

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      if (body.action === 'delete') {
        await jobs.deleteOne({ _id: new ObjectId(body.id) });
        
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
    console.error('Jobs error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});