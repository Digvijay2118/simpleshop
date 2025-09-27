# SimpleShop – Full Stack E-commerce App

This project is a simple full-stack e-commerce application with a React + Vite frontend and an Express backend.

---

## Project Structure

```
.
├── backend/
│   ├── controllers/
│   ├── data/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── index.html
```

---

## Backend

- **Tech:** Node.js, Express, CORS, Morgan
- **Features:**  
  - REST API for products and orders  
  - Serves product images from `/uploads`  
  - Simple in-memory order handling (orders are not persisted)

### Setup & Run

```sh
cd backend
npm install
npm start
```

- Runs on [http://localhost:5000](http://localhost:5000)

### API Endpoints

- `GET /api/products` – List all products
- `POST /api/orders` – Place an order  
  **Body Example:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main St",
    "items": [{ "id": 1, "qty": 2 }, ...],
    "total": 4998
  }
  ```

---

## Frontend

- **Tech:** React, Vite, Tailwind CSS, React Router, React Toastify, Swiper
- **Features:**  
  - Product listing, search, and filtering  
  - Shopping cart with add/remove/quantity  
  - Order placement form  
  - Thank you page after order

### Setup & Run

```sh
cd frontend
npm install
npm run dev
```

- Runs on [http://localhost:5173](http://localhost:5173) by default

### Notes

- The frontend expects the backend to be running at `http://localhost:5000`.
- Product images are loaded from the backend `/uploads` folder.

---

## Development

- **Backend:** Edit files in `backend/` and restart the server if needed.
- **Frontend:** Edit files in `frontend/src/` – hot reload is enabled.

---

## License

This project is for educational/demo purposes.