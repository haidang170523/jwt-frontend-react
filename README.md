# JWT Auth & RBAC React Frontend

This is the frontend counterpart of the JWT Auth and Role-Based Access Control (RBAC) system. It provides an administrative dashboard to manage users, roles, and group roles securely using JSON Web Tokens (JWT).

## 🚀 Features

- **Authentication:** Login and Register flows.
- **Protected Routes:** Secure pages using higher-order components or private routes (`<PrivateRoutes />`).
- **User Management:** View, paginate, add, edit, and delete users (`/users`).
- **Role Management:** Manage individual roles and permissions (`/roles`).
- **Group Roles Management:** Manage role groups (`/group-roles`).
- **Responsive UI:** Built with React Bootstrap and plain CSS/SCSS.
- **Notifications:** Integrated `react-toastify` for user feedback.

## 🛠️ Technology Stack

- **Framework:** React 17
- **Routing:** React Router v5
- **Styling:** Bootstrap 5, React-Bootstrap, FontAwesome, SASS
- **HTTP Client:** Axios
- **State Management:** React Context API (`UserContext`)
- **Other Utilities:** lodash, react-paginate, react-toastify, react-loader-spinner

## 📁 Project Structure

```text
src/
├── components/       # Reusable UI components and main views (Login, Register, Users, Roles, etc.)
├── context/          # React Context providers (e.g., UserContext for auth state)
├── routes/           # Application routing (AppRoutes, PrivateRoutes)
├── services/         # API integration via axios (userService, roleService)
└── setup/            # Axios interceptors or central configurations
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Available Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm run eject`: Ejects the Create React App configuration.

## 🔒 Authentication Flow

The application uses JWT-based authentication. Upon a successful login, the server returns a token which is saved (usually as an HTTP-only cookie). All subsequent requests to private endpoints use this token for authorization. The `UserContext` maintains the current user's authentication and loading states globally throughout the app.
