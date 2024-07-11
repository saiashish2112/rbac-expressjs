// Generate a token for an admin user
const jwt = require("jsonwebtoken");

const adminToken = jwt.sign(
  { id: 1, role: "admin" },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWFzaGlzaDIxMTIiLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.Qe0mbvuvCxEMfhK9Q0wmoTA3Nd4rdWVCr60LBTLDwdU",
  { expiresIn: "1h" }
);
console.log(`Admin Token: ${adminToken}`);
