import { FilterType } from "@/hooks/useTasks";

interface TaskFiltersProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export default function TaskFilters({ currentFilter, onFilterChange }: TaskFiltersProps) {
  const options: FilterType[] = ["all", "active", "completed"];

  return (
    <div className="flex items-center justify-center gap-2 mb-8 bg-gray-100 p-1 rounded-lg w-fit mx-auto">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onFilterChange(option)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
            currentFilter === option
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}