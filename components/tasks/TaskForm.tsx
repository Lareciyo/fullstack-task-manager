"use client";
import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string, priority: 'low' | 'medium' | 'high') => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, priority);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <div className="flex justify-between items-center">
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value as any)}
          className="p-2 border rounded-md bg-white"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-semibold">
          Add Task
        </button>
      </div>
    </form>
  );
}