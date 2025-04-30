import { Calendar, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { Priority, Todo } from "../types";
import { formatDateForInput } from "../utils/dateUtils";

interface TodoFormProps {
  onSubmit: (todo: Omit<Todo, "id" | "createdAt">) => void;
  initialValues?: Partial<Todo>;
  onCancel?: () => void;
  buttonText?: string;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSubmit,
  initialValues,
  onCancel,
  buttonText = "Add Todo",
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [dueDate, setDueDate] = useState<string>(
    initialValues?.dueDate ? formatDateForInput(initialValues.dueDate) : ""
  );
  const [priority, setPriority] = useState<Priority>(
    initialValues?.priority || null
  );
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      completed: initialValues?.completed || false,
      dueDate: dueDate ? new Date(dueDate) : null,
      priority,
    });

    if (!initialValues) {
      // Clear form if it's for creating a new todo
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority(null);
    }
  };

  const togglePriorityDropdown = () => {
    setShowPriorityDropdown(!showPriorityDropdown);
  };

  const selectPriority = (p: Priority) => {
    setPriority(p);
    setShowPriorityDropdown(false);
  };

  const priorityColorMap = {
    low: "text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300",
    medium:
      "text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300",
    high: "text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300",
    null: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300",
  };

  const priorityLabels: Record<string, string> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    null: "No Priority",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Title*
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description (optional)
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more details..."
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          rows={3}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Due Date (optional)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={16} className="text-gray-400" />
            </div>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-10 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority (optional)
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={togglePriorityDropdown}
              className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <span
                className={`inline-flex items-center ${
                  priority
                    ? priorityColorMap[priority]
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {priorityLabels[String(priority)]}
              </span>
              <ChevronDown size={16} className="text-gray-400" />
            </button>

            {showPriorityDropdown && (
              <div className="absolute left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-10">
                <div className="py-1">
                  {["high", "medium", "low", null].map((p) => (
                    <button
                      key={String(p)}
                      type="button"
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 ${
                        priority === p ? "bg-gray-100 dark:bg-gray-600" : ""
                      }`}
                      onClick={() => selectPriority(p as Priority)}
                    >
                      <span
                        className={
                          p
                            ? priorityColorMap[
                                p as keyof typeof priorityColorMap
                              ]
                            : "text-gray-600 dark:text-gray-300"
                        }
                      >
                        {priorityLabels[String(p)]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
