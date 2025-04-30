import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import useTodos from '../hooks/useTodos';
import { Todo } from '../types';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const { 
    todos, 
    filter, 
    sort, 
    search,
    addTodo, 
    updateTodo, 
    deleteTodo, 
    toggleComplete, 
    setFilter, 
    setSort, 
    setSearch,
    totalTodos,
    activeTodos,
    completedTodos
  } = useTodos();

  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTodo = (todo: Omit<Todo, 'id' | 'createdAt'>) => {
    addTodo(todo);
    setShowAddForm(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 space-y-4">
        <SearchBar onSearch={setSearch} initialValue={search} />
        
        <FilterBar 
          filter={filter} 
          sort={sort} 
          onFilterChange={setFilter} 
          onSortChange={setSort}
          counts={{
            all: totalTodos,
            active: activeTodos,
            completed: completedTodos
          }}
        />
      </div>
      
      {todos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            {search
              ? "No todos match your search"
              : filter === 'active'
              ? "No active todos"
              : filter === 'completed'
              ? "No completed todos"
              : "No todos yet"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleComplete={toggleComplete}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      )}
      
      {!showAddForm ? (
        <div className="mt-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center w-full justify-center px-4 py-3 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-100 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <Plus size={18} className="mr-2" />
            Add New Todo
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <TodoForm
            onSubmit={handleAddTodo}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default TodoList;