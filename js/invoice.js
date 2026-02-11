import { supabase } from "./supabase.js";

async function loadInvoice() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  const { data } = await supabase
    .from("transactions")
    .select("*")
    .eq("transaction_id", id)
    .single();

  if (!data) return;

  // Replace static invoice number text
  const invoiceSpan = document.querySelector("span.font-mono");
  if (invoiceSpan) invoiceSpan.innerText = "#INV-" + data.invoice_number;
}

loadInvoice();
