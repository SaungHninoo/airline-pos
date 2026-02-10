import { supabase } from "./supabase.js";

const { data: session } = await supabase.auth.getSession();
if (!session.session) {
  location.href = "login.html";
}
/* ======================
   LOAD AIRLINES (READ)
====================== */
window.loadAirlines = async function () {
  const { data, error } = await supabase
    .from("dim_airlines")
    .select("*")
    .eq("del_flg", 0)
    .order("airline_name");

  console.log("LOAD DATA:", data, error);

  const table = document.getElementById("airlineTable");
  table.innerHTML = `
    <tr>
      <th>Code</th>
      <th>Name</th>
      <th>Action</th>
    </tr>`;

  if (!data) return;

  data.forEach(a => {
    table.innerHTML += `
      <tr>
        <td>${a.airline_shortname}</td>
        <td>${a.airline_name}</td>
        <td>
  <button onclick="editAirline('${a.airline_id}')">Edit</button>
  <button onclick="deleteAirline('${a.airline_id}')">Delete</button>
</td>

      </tr>`;
  });

  document.getElementById("count").innerText = data.length;
};

/* ======================
   DELETE (SOFT DELETE)
====================== */
window.deleteAirline = async function (id) {
  await supabase
    .from("dim_airlines")
    .update({ del_flg: 1 })
    .eq("airline_id", id);

  loadAirlines();
};

/* ======================
   EXPORT EXCEL
====================== */
window.exportExcel = async function () {
  const { data } = await supabase
    .from("dim_airlines")
    .select("*")
    .eq("del_flg", 0);

  let csv = "Code,Name\n";
  data.forEach(d => {
    csv += `${d.airline_shortname},${d.airline_name}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "airlines.csv";
  a.click();
};

/* save*/
window.saveAirline = async function () {
  const id = document.getElementById("airline_id").value;

  const data = {
    airline_shortname: document.getElementById("shortname").value,
    airline_name: document.getElementById("name").value,
    remarks: document.getElementById("remarks").value,
    del_flg: 0
  };

  let result;
  if (id) {
    // EDIT
    result = await supabase
      .from("dim_airlines")
      .update(data)
      .eq("airline_id", id);
  } else {
    // INSERT
    result = await supabase
      .from("dim_airlines")
      .insert([data]);
  }

  document.getElementById("msg").innerText =
    result.error ? result.error.message : "Saved ✅";

  if (!result.error) {
    setTimeout(() => location.href = "index.html", 800);
  }
};
/*====edit ========*/
window.editAirline = async function (id) {
  const { data } = await supabase
    .from("dim_airlines")
    .select("*")
    .eq("airline_id", id)
    .single();

  localStorage.setItem("editAirline", JSON.stringify(data));
  location.href = "airline-form.html";
};
const editData = localStorage.getItem("editAirline");
if (editData) {
  const a = JSON.parse(editData);

  document.getElementById("title").innerText = "Edit Airline";
  document.getElementById("airline_id").value = a.airline_id;
  document.getElementById("shortname").value = a.airline_shortname;
  document.getElementById("name").value = a.airline_name;
  document.getElementById("remarks").value = a.remarks || "";

  localStorage.removeItem("editAirline");
}
window.cancel = function () {
  location.href = "index.html";
};


/* ======================
   AUTO LOAD ON PAGE OPEN
====================== */
loadAirlines();
