# Role-based access control (RBAC) system in an Express.js application

- Creating a `role-based access control (RBAC)` system in an Express.js application involves setting up middleware to check the user's role before allowing access to certain routes.
- Here is a step-by-step guide to implementing RBAC for `admin` and `user` roles using `Express.js:`

### 1. Setup Express.js

First, you need to set up an Express.js application if you haven't already.

```bash
npm init -y
npm install express jsonwebtoken body-parser
```

### 2. Create Middleware for Role Checking

Create a middleware to check the user's role. This middleware will check the `role` property of the user object, which should be set after user authentication.

```jsx
// middleware/roleMiddleware.js
function roleMiddleware(requiredRole) {
    return (req, res, next) => {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        next();
    };
}

module.exports = roleMiddleware;
```

### 3. Set Up User Authentication

For simplicity, `assume users are authenticated` and their `role is added to the request object`. In a real-world application, you would use a library like `jsonwebtoken` for handling authentication tokens.

### 4. Create Routes with Role-based Access Control

Use the role middleware to protect routes based on the user's role.

```jsx
// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/admin', roleMiddleware('admin'), (req, res) => {
    res.send('Hello Admin');
});

module.exports = adminRoutes;
```

```jsx
// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/user', roleMiddleware('user'), (req, res) => {
    res.send('Hello User');
});

module.exports = userRoutes;
```

### 5. Integrate Routes and Middleware in Express Application

Integrate your `routes and the role-based` middleware into the main application.

```jsx
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.json());

// Middleware to mock user authentication and role setting
app.use((req, res, next) => {
    // Simulate a user, in real application this should be replaced with actual authentication logic
    const token = req.headers['authorization'];

    if (token) {
        try {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            req.user = decoded;
        } catch (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
    }

    next();
});

app.use('/api', adminRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
```

### 6. Test the Application

To test the application, you need to generate JWT tokens with the appropriate role.

```jsx
// Generate a token for an admin user
const jwt = require('jsonwebtoken');

const adminToken = jwt.sign({ id: 1, role: 'admin' }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNhaWFzaGlzaDIxMTIiLCJwYXNzd29yZCI6InBhc3N3b3JkMTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.Qe0mbvuvCxEMfhK9Q0wmoTA3Nd4rdWVCr60LBTLDwdU', { expiresIn: '1h' });
console.log(`Admin Token: ${adminToken}`);

// Generate a token for a normal user
const userToken = jwt.sign({ id: 2, role: 'user' }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYXJ2aWw5NzIxIiwicGFzc3dvcmQiOiJwYXNzd29yZDEyMyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTE2MjM5MDIyfQ.XBpDHuPNX9kl0clgYG78S1W8HjX4VAvbNng7VZjG0Bs', { expiresIn: '1h' });

console.log(`User Token: ${userToken}`);

```

With the generated tokens, you can now make requests to the API and test the role-based access control.

- For `admin` routes, use the `Admin Token` in the `Authorization` header.
- For `user` routes, use the `User Token` in the `Authorization` header.

### Example Requests

```bash
curl -H "Authorization: Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzIwNzA1MDY1LCJleHAiOjE3MjA3MDg2NjV9.zdBNKvx7Mmkq6Pup5jnEbBxlL2cx1UHWZMjv0fzriv8>" <http://localhost:3000/api/admin>

curl -H "Authorization: Bearer <eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjA3MDUwOTUsImV4cCI6MTcyMDcwODY5NX0.16DrZwa_mYSv1nDH8qsKilR4_Xl1R_nx_gDg0XL4-As>" <http://localhost:3000/api/user>
```

> This setup provides a basic `RBAC implementation` for `admin` and `user` roles in an Express.js application. You can expand this by adding more roles, more complex permissions, and integrating a proper authentication mechanism.
>