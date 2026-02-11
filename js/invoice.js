import { supabase } from "./supabase.js";
import { protectPage } from "./auth.js";

protectPage();

async function loadInvoice() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const { data } = await supabase.from("transactions").select("*").eq("transaction_id", id).single();
  if (!data) return;

  document.getElementById("invoiceNo").innerText = data.invoice_number;
  document.getElementById("invoiceAmount").innerText = data.selling_amount;
}

loadInvoice();
