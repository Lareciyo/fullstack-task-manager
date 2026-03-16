import { Task } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, task.completed)}
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
        <span className={`${task.completed ? "line-through text-gray-400" : "text-gray-800"} font-medium`}>
          {task.title}
        </span>
      </div>
      
      <div className="flex items-center gap-4">
        <span className={`text-xs px-2 py-1 rounded-full uppercase font-bold ${
          task.priority === 'high' ? 'bg-red-100 text-red-600' : 
          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' : 
          'bg-green-100 text-green-600'
        }`}>
          {task.priority}
        </span>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}