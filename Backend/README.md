# **Backend API Documentation**

## **Base URL**

- Local Development: `http://localhost:4000`

---

## **1. User Registration**

### **Endpoint:**

`POST /users/register`

### **HTTP Method:**

POST

### **Description:**

Registers a new user by taking `fullname`, `email`, and `password` as input.

### **Request Headers:**

```json
{
  "Content-Type": "application/json"
}
```

### **Request Body:**

The request body should be in JSON format and include the following fields:

* fullname (object):
    firstname (string, required): User's first name (minimum 3 characters).
    lastname (string, optional): User's last name (minimum 3 characters).
* email (string, required): User's email address (must be a valid email).
* password (string, required): User's password (minimum 6 characters).

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### **Example Response:**
  
* user (object):
    #fullname (object).
      firstname (string): User's first name (minimum 3 characters).
      lastname (string): User's last name (minimum 3 characters).
    #email (string): User's email address (must be a valid email).
    #password (string): User's password (minimum 6 characters).
* token (String): JWT Token

#### **Success Response:**

**Status Code: 201 Created**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Responses:**

**Status Code: 400 Bad Request** (Validation Errors)

```json
{
  "errors": [
    { "msg": "First name must be at least 3 characters long" }
  ]
}
```

---


## **2. User Login**

### **Endpoint:**

`POST /users/login`

### **Description:**

Authenticates a registered user by verifying their email and password.

### **Request Headers:**

```json
{
  "Content-Type": "application/json"
}
```

### **Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "securepassword123"
}
```

### **Example Response:**

Same as user registration 

#### **Success Response:**

**Status Code: 200 OK**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI...",
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

#### **Error Responses:**

**Status Code: 401 Unauthorized** (Invalid Credentials)

```json
{
  "message": "Invalid email or password"
}
```

---


## **3. Create User (Internal Service Function)**

### **Endpoint:**

(Used internally by `registerUser` controller)

### **Description:**

Creates a new user in the database after hashing their password.

### **Function Signature:**

```js
module.exports.createUser = async ({ firstname, lastname, email, password }) => { ... }
```

### **Expected Input:**

```json
{
  "firstname": "John",
  "lastname": "Doe",
  "email": "john.doe@example.com",
  "password": "$2b$10$hashedpassword123"
}
```

---

## **Authentication & Security**

- Passwords are **hashed** before being stored.
- Authentication tokens are **JWT-based**.
- The `Authorization` header should be used for protected routes:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```

---

## **Validation Rules (Express-Validator)**

- **Email:** Must be a valid email format.
- **Password:** Must be at least 6 characters long.
- **Firstname:** Must be at least 3 characters long.

---

## **Error Handling**

- `400 Bad Request` for invalid inputs.
- `401 Unauthorized` for incorrect login credentials.
- `500 Internal Server Error` for unexpected issues.

---

## **Technologies Used**

- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Token (JWT)
- **Validation:** express-validator