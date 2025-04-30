import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import TodoList from './components/TodoList';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo App</h1>
          <ThemeToggle />
        </header>
        
        <main>
          <TodoList />
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Made with React, TypeScript, Vite, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;