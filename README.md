
# 📚 CampRider PWA Frontend Developer Guide

This guide is designed for developers contributing to the **CampRider PWA Frontend**. It provides an in-depth look at the project architecture, style standards, API conventions, and the preferred contribution workflow to ensure code quality, consistency, and scalability.

---

## 1. ⚙ Architecture and Structure

The project is built with **React**, **React Router**, and **TailwindCSS**, following a modular, feature-based file structure.

### 1.1 Core Directory Layout

```

src/
├── api/                    \# API clients organized by module/role (Admin/Pilot)
├── assets/                 \# Static files (images, icons, fonts)
├── components/             \# Reusable UI elements (Buttons, Headers, Cards)
│   ├── Navbar/
│   ├── Modal/
│   └── common/             \# Small, universal components
├── pages/                  \# Page-level components, handling routing, state logic, and API calls
│   ├── admin/
│   ├── pilot/
│   └── styles/             \# Global page styles (if any)
├── App.jsx                 \# Main Router and Application container
├── index.jsx               \# App entry point
└── serviceWorker.js        \# PWA caching and offline support

````

### 1.2 Component and Page Structure

Every complex component or page must be contained within its own folder, accompanied by a dedicated `styles/` folder for local CSS.

| Type | Path Template | Notes |
| :--- | :--- | :--- |
| **Page** | `src/pages/<Role>/<PageName>.jsx` | Handles routing and core business logic. |
| **Page Styles** | `src/pages/<Role>/styles/<PageName>.css` | Scoped styles for the specific page. |
| **Component** | `src/components/<ComponentName>/<ComponentName>.jsx` | Reusable UI logic. Should accept props. |
| **Component Styles** | `src/components/<ComponentName>/styles/<ComponentName>.css` | Scoped styles for the component. |

---

## 2. 🎨 Style Conventions

We leverage **TailwindCSS** utilities heavily. Custom CSS is reserved for complex layouts, animations, or styling that cannot be achieved cleanly with utility classes.

### 2.1 CSS & Scoping

1.  **Local Imports:** Stylesheets **must** be imported locally within the component/page file (e.g., `import './styles/ComponentName.css';`).
2.  **No Global Overrides:** Avoid overriding global styles or third-party library styles in component CSS. Use wrapper classes or Tailwind's `@layer` feature if necessary.
3.  **Utility Preference:** Always use a Tailwind utility class instead of writing custom CSS if the utility exists (e.g., use `class="text-lg"` instead of writing `.title { font-size: 1.125rem; }`).

### 2.2 Class Naming

Use **BEM (Block-Element-Modifier)** conventions for any custom CSS classes to ensure clarity and avoid conflicts.

| Part | Example | Description |
| :--- | :--- | :--- |
| **Block** | `.card` | The component root. |
| **Element** | `.card__header` | A child part of the block. |
| **Modifier** | `.card--active` | A state or variation of the block. |

---

## 3. 🔗 API Integration and Data Handling

All data interaction must pass through the dedicated API client files in the `src/api/` directory.

### 3.1 API Client Conventions

* **Organization:** Clients are grouped by user role (`admin`, `pilot`).
* **Asynchronous:** All API functions must use the **`async/await`** pattern.
* **Encapsulation:** The API client should handle the axios/fetch configuration, headers, and token management. It should only expose functions like `getAllUsers()`, `updateFlight()`, etc.

### 3.2 Error Handling

API calls in page/component files **must** be wrapped in `try...catch` blocks.

```javascript
// Example in a Page component
import { createNewUser } from '../../api/admin/adminClient';

const handleSubmit = async (userData) => {
  setLoading(true);
  try {
    const response = await createNewUser(userData);
    console.log('User created:', response.data);
    // Success: navigate, close modal, show toast
  } catch (error) {
    console.error('API Error:', error.response || error.message);
    // Failure: show a user-friendly error message using a Toast or Alert component
  } finally {
    setLoading(false);
  }
};
````

-----

## 4\. 🛠 Coding Standards

### 4.1 React

  * **Functionality:** Use **React Functional Components** and **Hooks** exclusively.
  * **State:** Prefer **`useState`** and **`useReducer`** for local component state. Use the **Context API** (or Redux/Zustand if the project grows) for truly global, shared state.
  * **Effects:** Use **`useEffect`** for side-effects. Always define a cleanup function (return statement) if the effect creates subscriptions, timers, or listeners.

### 4.2 Naming Conventions

  * **Components/Files:** **`PascalCase`** (e.g., `UserCard.jsx`, `Dashboard.jsx`).
  * **Variables/Functions:** **`camelCase`** (e.g., `userList`, `fetchUserData`).
  * **Constants:** **`SCREAMING_SNAKE_CASE`** (e.g., `API_BASE_URL`).

### 4.3 Imports

  * Use **absolute imports from `src/`** for deep modules (e.g., `import Navbar from 'components/Navbar/Navbar';`).
  * Use **relative imports** for files within the same feature or directory.

-----

## 5\. 💡 Contribution Workflow

### 5.1 Branching

We follow the **Git Flow** model (or a simplified version).

1.  **Fork** the repository.
2.  **Create a feature branch** from `main` or `develop`.
    ```bash
    # Create a new branch for a feature
    git checkout -b feature/pilot-login-fix
    # OR for a bug fix
    git checkout -b bugfix/admin-table-loading
    ```
3.  **Do NOT commit directly to `main` or `develop`**.

### 5.2 Commit Messages

Commit messages should be clear, concise, and descriptive. Use the **Conventional Commits** format (or a similar standard) for clarity.

  * **`feat:`** A new feature.
  * **`fix:`** A bug fix.
  * **`docs:`** Documentation changes.
  * **`style:`** Formatting, missing semi-colons, etc.; no code change.
  * **`refactor:`** A code change that neither fixes a bug nor adds a feature.

**Example:**

```
fix: correct flight status comparison in Pilot Dashboard

The status was being compared to a string instead of the enum value, leading to incorrect display.
```

### 5.3 Pull Requests (PRs)

1.  Ensure all code adheres to the **Code Standards** and **Style Conventions**.
2.  Test your changes locally.
3.  Open a **Pull Request (PR)** targeting the `main` or `develop` branch.
4.  Include a clear description of the changes, what features they affect, and any required reviewers.
5.  Wait for at least one approval before merging.

-----

## 6\. 🌐 PWA Checklist

Since this is a Progressive Web Application, ensure new features support offline functionality where reasonable:

  * **Caching:** Verify that new assets (images, fonts) are being cached by `serviceWorker.js`.
  * **Offline State:** Design pages to handle a lack of network connectivity gracefully (e.g., showing a friendly "Offline" message instead of a blank screen).

<!-- end list -->

```
```
