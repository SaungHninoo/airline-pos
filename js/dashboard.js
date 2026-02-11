import { supabase } from "./supabase.js";
import { protectPage, logout } from "./auth.js";

protectPage();

document.getElementById("logout")?.addEventListener("click", logout);

async function loadStats() {
  const { data } = await supabase.from("transactions").select("selling_amount");

  if (!data) return;

  const total = data.reduce((sum, t) => sum + (t.selling_amount || 0), 0);
  document.getElementById("totalSales").innerText = total;
}

loadStats();
