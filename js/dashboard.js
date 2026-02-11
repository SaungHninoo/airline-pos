import { supabase } from "./supabase.js";

async function loadRevenue() {
  const { data } = await supabase.from("transactions").select("selling_amount");
  if (!data) return;

  const total = data.reduce((sum, t) => sum + (t.selling_amount || 0), 0);

  const target = document.querySelector("h1");
  if (target) target.innerText += " | Total Sales: " + total;
}

loadRevenue();
