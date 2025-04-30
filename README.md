# Modern Todo App

A clean, modern Todo application built with React, TypeScript, Vite, and Tailwind CSS.

![Todo App Screenshot](https://via.placeholder.com/800x450.png?text=Todo+App+Screenshot)

## Features

- ✅ Add new todos with title and optional description
- ✏️ Edit existing todos inline
- ✓ Mark todos as completed/incomplete
- 🗑️ Delete todos (with confirmation)
- 🔍 Filter by status (All, Active, Completed)
- 🔎 Search todos by text
- 💾 Persist data in localStorage
- 🌓 Dark/Light mode toggle
- 📱 Responsive layout
- 📅 Due date field (optional)
- 🔢 Sort todos by newest/oldest
- 🚩 Priority levels (Low, Medium, High) with color badges

## Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **Tailwind CSS** - Styling
- **Lucide Icons** - UI Icons

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoList.tsx     # Main todo list container
│   ├── TodoItem.tsx     # Individual todo item
│   ├── TodoForm.tsx     # Form for adding/editing todos
│   ├── SearchBar.tsx    # Search functionality
│   ├── FilterBar.tsx    # Filter and sort controls
│   ├── PriorityBadge.tsx # Priority indicator
│   ├── ConfirmDialog.tsx # Delete confirmation dialog
│   └── ThemeToggle.tsx  # Dark/light mode switch
├── hooks/               # Custom React hooks
│   ├── useTodos.ts      # Todo state management
│   ├── useDarkMode.ts   # Theme state management
│   └── useLocalStorage.ts # LocalStorage persistence
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Helper functions
│   └── dateUtils.ts     # Date formatting utilities
├── App.tsx              # Main application component
└── main.tsx             # Application entry point
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## License

MIT
