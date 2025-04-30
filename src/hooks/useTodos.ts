import { useCallback, useState } from 'react';
import { Filter, Sort, Todo } from '../types';
import useLocalStorage from './useLocalStorage';

// Custom reviver function for JSON parse to convert date strings back to Date objects
const dateReviver = (key: string, value: any) => {
  if (key === 'createdAt' || key === 'dueDate') {
    return value ? new Date(value) : null;
  }
  return value;
};

// Custom replacer function for JSON stringify to handle Date objects
const dateReplacer = (key: string, value: any) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
};

const useTodos = () => {
  // Parse stored JSON and convert date strings back to Date objects
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  // Fix dates that might have been stored as strings
  useState(() => {
    setTodos(todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt instanceof Date ? todo.createdAt : new Date(todo.createdAt),
      dueDate: todo.dueDate ? (todo.dueDate instanceof Date ? todo.dueDate : new Date(todo.dueDate)) : null
    })));
  });

  const [filter, setFilter] = useLocalStorage<Filter>('todoFilter', 'all');
  const [sort, setSort] = useLocalStorage<Sort>('todoSort', 'newest');
  const [search, setSearch] = useState('');

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  }, [setTodos]);

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => todo.id === id ? { ...todo, ...updates } : todo)
    );
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, [setTodos]);

  const toggleComplete = useCallback((id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  // Get filtered todos
  const getFilteredTodos = useCallback(() => {
    // Apply search filter first
    let filtered = [...todos];
    if (search) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        todo => 
          todo.title.toLowerCase().includes(searchLower) || 
          todo.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    switch (filter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      // 'all' doesn't filter anything
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sort === 'newest') {
        return b.createdAt.getTime() - a.createdAt.getTime();
      } else {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
    });

    return filtered;
  }, [todos, filter, sort, search]);

  return {
    todos: getFilteredTodos(),
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
    totalTodos: todos.length,
    activeTodos: todos.filter(todo => !todo.completed).length,
    completedTodos: todos.filter(todo => todo.completed).length
  };
};

export default useTodos;