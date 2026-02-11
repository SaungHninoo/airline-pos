import { supabase } from "./supabase.js";

async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (!data.session && !window.location.pathname.includes("login")) {
    window.location.href = "login.html";
  }
}

checkSession();

const form = document.querySelector("form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("input[type=email]").value;
  const password = document.querySelector("input[type=password]").value;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return alert(error.message);

  window.location.href = "dashboard.html";
});
