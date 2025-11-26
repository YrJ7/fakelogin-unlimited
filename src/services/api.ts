const API_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

export const api = {
  // Auth
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', email, password }),
    });
    return response.json();
  },

  register: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', email, password }),
    });
    return response.json();
  },

  // Jobs
  getJobs: async () => {
    const response = await fetch(`${API_URL}/jobs`);
    return response.json();
  },

  createJob: async (jobData: any) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', ...jobData }),
    });
    return response.json();
  },

  updateJob: async (id: string, updates: any) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', id, ...updates }),
    });
    return response.json();
  },

  deleteJob: async (id: string) => {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id }),
    });
    return response.json();
  },

  // Applications
  getApplications: async () => {
    const response = await fetch(`${API_URL}/applications`);
    return response.json();
  },

  createApplication: async (applicationData: any) => {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'create', ...applicationData }),
    });
    return response.json();
  },

  updateApplication: async (id: string, updates: any) => {
    const response = await fetch(`${API_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update', id, ...updates }),
    });
    return response.json();
  },

  // Resume Analysis
  analyzeResume: async (resumeText: string, jobRequirements: string, jobTitle: string) => {
    const response = await fetch(`${API_URL}/resume-analysis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, jobRequirements, jobTitle }),
    });
    return response.json();
  },

  // Voice Transcription
  transcribeAudio: async (audioBase64?: string, audioUrl?: string) => {
    const response = await fetch(`${API_URL}/voice-transcription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioBase64, audioUrl }),
    });
    return response.json();
  },
};