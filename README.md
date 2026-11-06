# TaskFlow Frontend - React.js

Modern, responsive Task Management System frontend built with **React 18** and **Vite**, replicated from the **Stitch by Google** UI/UX design specifications.

---

## 🎨 UI/UX Specifications Replicated from Google Stitch

1. **Dashboard View**:
   - Welcome Hero Card ("Good Morning, Welcome Back!") with soft gradient illustration.
   - 4 Interactive Stat Cards:
     - **Total Tasks** (Purple theme)
     - **Completed** (Green theme)
     - **Pending** (Amber theme)
     - **Overdue** (Red theme)
   - SVG Donut Progress Chart showing completion rate (`% Completed`).
   - Recent Tasks table with 1-click status checkboxes.
   - Today's Tasks list with dynamic counter badge.
   - Motivational Achievement banner ("You're on track!").

2. **All Tasks View**:
   - Data table with `#`, `Task Title`, `Description`, `Due Date`, `Priority`, `Status`, and `Actions`.
   - Real-time search by keywords.
   - Filtering by Priority (**High**, **Medium**, **Low**) and Status (**Pending**, **Completed**).
   - Multi-column Sorting (Due Date asc/desc, Priority, Title, Created Date).
   - Action buttons: Edit modal, Delete confirmation modal, and 1-click status toggle.
   - Pagination controls.

3. **Pending Tasks View**:
   - Clean card-based focus view for active tasks.
   - 1-click completion directly from card.
   - Empty state illustration with celebratory messaging when all tasks are complete.

4. **Completed Tasks View**:
   - Archive list with green completion badges.
   - 1-click **Restore** button to reopen completed tasks.
   - Celebration badge ("All caught up!").

5. **Settings & Preferences View**:
   - Profile management for **Priya Sharma** (`priya@example.com`).
   - Theme switcher (**Light**, **Dark**, **System**).
   - App preferences (Items per page, default filters, date format).
   - Notification toggle switches (Task Reminders, Overdue Alerts, Daily Summary).

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Quick Start

1. Open your terminal in this directory:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Or simply double-click `start-frontend.bat`.

3. Open your browser at:
   ```
   http://localhost:5173
   ```

---

## 🔄 Standalone & Fullstack Ready

- **Standalone Mode (Zero Backend Required)**:
  Runs out-of-the-box with built-in client mock data and automatic `localStorage` persistence. Any tasks added, modified, deleted, or settings saved persist automatically in your browser session.

- **Fullstack Integration (Spring Boot / REST API)**:
  Vite is pre-configured with a proxy (`/api -> http://localhost:8080`). If your Spring Boot backend is running, the frontend automatically syncs with your backend endpoints (`/api/tasks`, `/api/dashboard/stats`, `/api/user/profile`).

---

## 📁 Project Structure

```
VIRTUSA FRONTEND/
├── package.json               # React 18, Vite, Lucide Icons
├── vite.config.js             # Vite configuration with API proxy
├── index.html                 # App shell with Plus Jakarta Sans typography
├── start-frontend.bat         # 1-click launcher for Windows
├── README.md                  # Project documentation
└── src/
    ├── main.jsx               # React entry point
    ├── App.jsx                # State management, views routing, modals
    ├── index.css              # Stitch-accurate styling & responsive CSS
    ├── api/
    │   └── taskApi.js         # API client with automatic LocalStorage fallback
    ├── components/
    │   ├── Sidebar.jsx        # Deep navy indigo sidebar with user widget
    │   ├── Header.jsx         # Search bar, notifications badge & profile pill
    │   ├── TaskModal.jsx      # Create / Edit task dialog
    │   └── DeleteConfirmModal.jsx # Confirmation dialog
    └── pages/
        ├── DashboardPage.jsx  # Hero banner, 4 KPI cards, donut chart, recent tasks
        ├── AllTasksPage.jsx   # Data table with search, priority/status filters, actions
        ├── PendingTasksPage.jsx # Card view of pending tasks & empty state
        ├── CompletedTasksPage.jsx # Completed tasks with 1-click restore & celebration card
        └── SettingsPage.jsx   # Profile details, theme switcher, app preferences
```

