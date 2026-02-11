import { supabase } from "./supabase.js";

async function loadCustomers() {
  const { data } = await supabase.from("customers").select("*");
  if (!data) return;

  console.log("Customers:", data);
}

loadCustomers();
