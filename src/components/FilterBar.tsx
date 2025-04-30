import { Clock } from 'lucide-react';
import React from 'react';
import { Filter, Sort } from '../types';

interface FilterBarProps {
  filter: Filter;
  sort: Sort;
  onFilterChange: (filter: Filter) => void;
  onSortChange: (sort: Sort) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  sort,
  onFilterChange,
  onSortChange,
  counts
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0 mb-4">
      <div className="flex space-x-1">
        <FilterButton 
          label="All" 
          count={counts.all}
          active={filter === 'all'} 
          onClick={() => onFilterChange('all')} 
        />
        <FilterButton 
          label="Active" 
          count={counts.active}
          active={filter === 'active'} 
          onClick={() => onFilterChange('active')} 
        />
        <FilterButton 
          label="Completed" 
          count={counts.completed}
          active={filter === 'completed'} 
          onClick={() => onFilterChange('completed')} 
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Clock size={16} className="text-gray-500 dark:text-gray-400" />
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as Sort)}
          className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-md border border-gray-300 dark:border-gray-600 py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, count, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
        active
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
      }`}
    >
      {label} <span className="text-xs ml-1 opacity-75">({count})</span>
    </button>
  );
};

export default FilterBar;