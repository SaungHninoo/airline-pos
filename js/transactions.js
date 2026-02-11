import { supabase } from "./supabase.js";
import { protectPage } from "./auth.js";

protectPage();

async function loadTransactions() {
  const { data } = await supabase.from("transactions").select("*");
  const list = document.getElementById("transactionList");

  list.innerHTML = "";
  data?.forEach(t => {
    const li = document.createElement("li");
    li.innerText = "Invoice: " + t.invoice_number + " - " + t.selling_amount;
    list.appendChild(li);
  });
}

document.getElementById("addTransaction")?.addEventListener("click", async () => {
  const amount = document.getElementById("amount").value;

  await supabase.from("transactions").insert({
    selling_amount: parseFloat(amount),
    tran_status: "DRAFT"
  });

  loadTransactions();
});

loadTransactions();
