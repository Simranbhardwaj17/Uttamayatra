# **Backend API Documentation**

## **Base URL**

- Local Development: `http://localhost:4000`

---

## **1. User Registration**

### **Endpoint:**

`POST /users/register`

### **Description:**

Registers a new user by taking `fullname`, `email`, and `password` as input.

### **Request Headers:**

```json
{
  "Content-Type": "application/json"
}
```

### **Request Body:**

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