const API_URL = "http://localhost:5000/api/schools";

async function fetchSchools() {
  const search = document.getElementById("searchInput").value;
  const res = await fetch(`${API_URL}?search=${search}`);
  const data = await res.json();
  const tbody = document.querySelector("#schoolTable tbody");
  tbody.innerHTML = data
    .map(
      (school) => `
    <tr>
      <td>${school.id}</td>
      <td>${school.name}</td>
      <td>${school.location}</td>
      <td>
        <button onclick="editSchool(${school.id}, '${school.name}', '${school.location}')">✏️</button>
        <button onclick="deleteSchool(${school.id})">🗑️</button>
      </td>
    </tr>
  `
    )
    .join("");
}

async function addSchool() {
  const name = document.getElementById("schoolName").value;
  const location = document.getElementById("schoolLocation").value;
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, location }),
  });
  hideForm();
  fetchSchools();
}

async function deleteSchool(id) {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  fetchSchools();
}

function editSchool(id, name, location) {
  document.getElementById("schoolName").value = name;
  document.getElementById("schoolLocation").value = location;
  document.getElementById("formContainer").classList.remove("hidden");
  document.querySelector("#formContainer button").onclick = async () => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: schoolName.value,
        location: schoolLocation.value,
      }),
    });
    hideForm();
    fetchSchools();
  };
}

function showForm() {
  document.getElementById("formContainer").classList.remove("hidden");
}

function hideForm() {
  document.getElementById("formContainer").classList.add("hidden");
  document.getElementById("schoolName").value = "";
  document.getElementById("schoolLocation").value = "";
}

fetchSchools();
