import { Calendar, CheckCircle, Circle, Edit, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { Todo } from '../types';
import { formatDate, isOverdue } from '../utils/dateUtils';
import ConfirmDialog from './ConfirmDialog';
import PriorityBadge from './PriorityBadge';
import TodoForm from './TodoForm';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    onUpdate(todo.id, updatedTodo);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    onDelete(todo.id);
    setShowDeleteConfirm(false);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  if (isEditing) {
    return (
      <div className="mb-3 animate-fadeIn">
        <TodoForm
          initialValues={todo}
          onSubmit={handleUpdate}
          onCancel={handleCancelEdit}
          buttonText="Save"
        />
      </div>
    );
  }

  const overdueClass = todo.dueDate && isOverdue(todo.dueDate) && !todo.completed
    ? 'text-red-600 dark:text-red-400'
    : '';

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-3 transition-all duration-200 ${
        todo.completed ? 'opacity-75' : ''
      }`}>
        <div className="flex items-start gap-3">
          <button
            onClick={() => onToggleComplete(todo.id)}
            className="mt-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 focus:outline-none transition-colors duration-200"
            aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
          >
            {todo.completed ? (
              <CheckCircle size={20} className="text-green-500 dark:text-green-400" />
            ) : (
              <Circle size={20} />
            )}
          </button>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className={`text-base font-medium ${
                todo.completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {todo.title}
              </h3>
              {todo.priority && <PriorityBadge priority={todo.priority} />}
            </div>
            
            {todo.description && (
              <p className={`text-sm ${
                todo.completed 
                  ? 'text-gray-400 dark:text-gray-500' 
                  : 'text-gray-600 dark:text-gray-300'
              }`}>
                {todo.description}
              </p>
            )}
            
            {todo.dueDate && (
              <div className={`flex items-center text-xs mt-2 ${overdueClass}`}>
                <Calendar size={14} className="mr-1" />
                <span>Due: {formatDate(todo.dueDate)}</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-1 ml-2">
            <button
              onClick={handleEdit}
              className="p-1 text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Edit todo"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Delete todo"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todo.title}"?`}
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        type="danger"
      />
    </>
  );
};

export default TodoItem;