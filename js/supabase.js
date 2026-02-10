import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔴 IMPORTANT: replace with YOUR real values
const SUPABASE_URL = "https://uvspyvsvgrrpvyzcffsy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2c3B5dnN2Z3JycHZ5emNmZnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MjA5MzAsImV4cCI6MjA4NjI5NjkzMH0._gqm08ucdXqmkalOgHjNrBUi9d6Vh9pGkm1Qr97aRW4";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
