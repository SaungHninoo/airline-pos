import { supabase } from "./supabase.js";

async function loadSettings() {
  const { data } = await supabase.from("company_settings").select("*").single();
  if (!data) return;

  console.log("Settings:", data);
}

loadSettings();
