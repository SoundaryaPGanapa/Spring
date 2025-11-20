const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let schools = [
  { id: 1, name: "Green Valley High School", location: "Bangalore" },
  { id: 2, name: "Sunrise Public School", location: "Chennai" },
  { id: 3, name: "Hilltop International", location: "Mumbai" },
];

app.get("/api/schools", (req, res) => {
  const search = req.query.name;
  if (search) {
    const filtered = schools.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    res.json(filtered);
  } else {
    res.json(schools);
  }
});

app.post("/api/schools", (req, res) => {
  const { name, location } = req.body;
  if (!name || !location) {
    return res.status(400).json({ message: "Name and location are required" });
  }
  const newSchool = { id: schools.length + 1, name, location };
  schools.push(newSchool);
  res.status(201).json(newSchool);
});

app.put("/api/schools/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, location } = req.body;

  const school = schools.find((s) => s.id === id);
  if (!school) return res.status(404).json({ message: "School not found" });

  school.name = name || school.name;
  school.location = location || school.location;
  res.json({ message: "School updated successfully", school });
});

app.delete("/api/schools/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = schools.findIndex((s) => s.id === id);

  if (index === -1)
    return res.status(404).json({ message: "School not found" });

  schools.splice(index, 1);
  res.json({ message: "School deleted successfully" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
