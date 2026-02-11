import { supabase } from "./supabase.js";
import { protectPage } from "./auth.js";

protectPage();

async function loadCustomers() {
  const { data } = await supabase.from("customers").select("*");
  const list = document.getElementById("customerList");

  list.innerHTML = "";
  data?.forEach(c => {
    const li = document.createElement("li");
    li.innerText = c.full_name + " - " + (c.email || "");
    list.appendChild(li);
  });
}

document.getElementById("addCustomer")?.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  await supabase.from("customers").insert({ full_name: name });
  loadCustomers();
});

loadCustomers();
