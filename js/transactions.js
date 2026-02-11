import { supabase } from "./supabase.js";

async function loadTransactions() {
  const { data } = await supabase.from("transactions").select("*");
  if (!data) return;

  console.log("Transactions:", data);
}

loadTransactions();
