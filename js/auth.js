import { supabase } from "./supabase.js";

export async function protectPage() {
  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    window.location.href = "login.html";
  }
}

export async function logout() {
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

const form = document.getElementById("login-form");
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  window.location.href = "index.html";
});
