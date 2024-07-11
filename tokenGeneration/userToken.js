const jwt = require("jsonwebtoken");
// Generate a token for a normal user
const userToken = jwt.sign(
  { id: 2, role: "user" },
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJ2aWw5NzIxIiwicGFzc3dvcmQiOiJwYXNzd29yZDEyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.XBpDHuPNX9kl0clgYG78S1W8HjX4VAvbNng7VZjG0Bs",
  { expiresIn: "1h" }
);

console.log(`User Token: ${userToken}`);
