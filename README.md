# Book Review API

A RESTful API for managing books and user reviews, built with Node.js, Express, and MongoDB.

---

## 🚀 Features

- User registration and login (JWT authentication)
- Add, list, and view books
- Submit, update, and delete reviews (one review per user per book)
- Pagination and filtering by author/genre
- Search by title or author (case-insensitive)

---

## 🛠️ Project Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/farddinkhan730/book-review-api.git
   cd book-review-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mydb
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the project**
   ```bash
   npm run dev
   ```
   The server will run on the port specified in `.env` (default: 5000).

---

## 🧪 Example API Requests (cURL)

### User Signup
```bash
curl -X POST http://localhost:5000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456"}'
```

### User Login
```bash
curl -X POST http://localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```
_Response:_
```json
{ "token": "<JWT_TOKEN>" }
```

### Add a Book (Requires JWT)
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"1984","author":"George Orwell","genre":"Dystopian","description":"Classic novel"}'
```

### List/Search Books
```bash
curl "http://localhost:5000/api/books?author=orwell&genre=dystopian&page=1&limit=10"
```

### Get Book Details (with reviews & average rating)
```bash
curl http://localhost:5000/api/books/<BOOK_ID>
```

### Add a Review (Requires JWT)
```bash
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Amazing book!"}'
```

### Update a Review (Requires JWT)
```bash
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Updated comment"}'
```

### Delete a Review (Requires JWT)
```bash
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## ⚙️ Design Decisions & Assumptions

- **Authentication:** JWT tokens are required for all book and review modifications. Tokens must be sent as `Authorization: Bearer <token>`.
- **Password Security:** Passwords are hashed with bcrypt before storage.
- **Review Policy:** Each user can review a book only once. Only the review owner can update or delete their review.
- **Error Handling:** Standard HTTP status codes and error messages are returned.
- **Pagination & Filtering:** Supported via query parameters on the `/api/books` endpoint.
- **Timestamps:** Book and review models use automatic `createdAt` and `updatedAt` fields.

---

## 🗃️ Database Schema

### User
| Field    | Type    | Description         |
|----------|---------|---------------------|
| username | String  | User's name         |
| email    | String  | Unique, required    |
| password | String  | Hashed password     |

### Book
| Field      | Type      | Description                |
|------------|-----------|----------------------------|
| title      | String    | Book title                 |
| author     | String    | Book author                |
| genre      | String    | Book genre                 |
| description| String    | Book description           |
| createdBy  | ObjectId  | Reference to User          |
| createdAt  | Date      | Auto-generated             |
| updatedAt  | Date      | Auto-generated             |

### Review
| Field     | Type      | Description                |
|-----------|-----------|----------------------------|
| book      | ObjectId  | Reference to Book          |
| user      | ObjectId  | Reference to User          |
| rating    | Number    | 1-5                        |
| comment   | String    | Review text                |
| createdAt | Date      | Auto-generated             |
| updatedAt | Date      | Auto-generated             |

---

## 📌 Notes

- Replace `<JWT_TOKEN>`, `<BOOK_ID>`, and `<REVIEW_ID>` with actual values from your API responses.
- Ensure MongoDB is running and accessible from your environment.
- All endpoints return JSON responses.
- For development, use tools like [Postman](https://www.postman.com/) for easier API testing.

---