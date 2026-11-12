# TaskManager — Frontend (Virtusa M.Tech Capstone 2)

A clean, responsive, student-friendly Task Management frontend built with **React (Vite)** and **Plain CSS**, designed to integrate seamlessly with a **Spring Boot REST API** backend.

---

## 🚀 How to Run the App

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
Open your terminal in the project directory and run:
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
The application will launch on [http://localhost:3000](http://localhost:3000).

---

## 🔑 Test Accounts (Mock Authentication)
The app comes pre-configured with mock data and persistent storage in `localStorage`. You can immediately:
1. **Log in with existing mock account:**
   - **Email:** `priya@virtusa.com`
   - **Password:** `password123`
2. **Or create a new account:**
   - Go to `/signup`, fill in your name, email, and password (at least 6 characters).
   - Your account will be saved to `localStorage` and you will be logged in immediately.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── Navbar.jsx & Navbar.css         # Top navigation bar with active links & user profile
│   ├── ProtectedRoute.jsx              # Route guard redirecting unauthenticated users to /login
│   ├── TaskForm.jsx & TaskForm.css     # Modal dialog for creating and editing tasks
│   ├── TaskItem.jsx & TaskItem.css     # Table row component for individual tasks
│   └── ConfirmModal.jsx & ConfirmModal.css # Modal dialog for confirming task deletion
├── pages/
│   ├── Login.jsx & Login.css           # Login page (/login) with form validation
│   ├── Signup.jsx & Signup.css         # Signup page (/signup) with password match validation
│   ├── Dashboard.jsx & Dashboard.css   # Dashboard (/dashboard) with metric cards & recent tasks
│   └── Tasks.jsx & Tasks.css           # Tasks page (/tasks) with full CRUD table & modal actions
├── services/
│   └── api.js                          # API client with BASE_URL and commented Spring Boot endpoints
├── App.jsx                             # Router setup with React Router DOM
├── main.jsx                            # React entry point
└── index.css                           # Global CSS variables, reset, and shared styles
```

---

## 🛠️ Instructions for Backend Teammates (Spring Boot Integration)

All backend communication is centralized in **`src/services/api.js`**.
Currently, it uses `localStorage` with realistic simulated network delays so the frontend works out-of-the-box.

### 1. API Base URL
In `src/services/api.js`:
```javascript
const BASE_URL = 'http://localhost:8080/api';
```
Change this if your Spring Boot server runs on a different port or path.

### 2. Endpoint Mapping

| Action | HTTP Method | Endpoint | Request Payload | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| **Signup** | `POST` | `/api/auth/signup` | `{ name, email, password }` | `{ success: true, user: { name, email }, token }` |
| **Login** | `POST` | `/api/auth/login` | `{ email, password }` | `{ success: true, user: { name, email }, token }` |
| **Get Tasks** | `GET` | `/api/tasks` | *None* (Bearer token in header) | `[ { id, title, description, status }, ... ]` |
| **Create Task** | `POST` | `/api/tasks` | `{ title, description, status }` | `{ id, title, description, status }` |
| **Update Task** | `PUT` | `/api/tasks/{id}` | `{ title, description, status }` | `{ id, title, description, status }` |
| **Delete Task** | `DELETE` | `/api/tasks/{id}` | *None* | `{ success: true }` |

### 3. How to Connect
Inside `src/services/api.js`, each function contains a commented-out `fetch()` block ready to be enabled:

```javascript
// Example: in getTasks()
export const getTasks = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/tasks`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return await response.json();
};
```

### 4. Enable CORS in Spring Boot
Ensure your Spring Boot backend allows requests from the Vite frontend port (`http://localhost:3000`):
```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

---

## 🎨 Design Highlights
- **Palette**: Dark charcoal background (`#161616`), surface cards (`#1e1e1e`), thin 1px borders (`#2e2e2e`), and a clean muted teal accent (`#0F6E56`).
- **No Heavy Libraries**: Pure CSS without Tailwind, styled-components, or animation bundles.
- **Hooks Utilized**:
  - `useState` for state management.
  - `useEffect` for data loading and sync.
  - `useRef` for auto-focusing form inputs when pages or modals open.

