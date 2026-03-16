import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import * as taskLib from '../lib/tasks';

export type FilterType = 'all' | 'active' | 'completed';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Fetch data from Firestore
  const fetchTasks = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await taskLib.getTasks(userId);
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks from database.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 2. Re-fetch when user logs in/out
  useEffect(() => {
    fetchTasks();
  }, [userId]);

  // 3. Logic for filtering tasks (Separation of Concerns!)
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // 4. CRUD operations that trigger a UI refresh
  const addTask = async (title: string, priority: Task['priority']) => {
    if (!userId) return;
    try {
      const newTask = {
        userId,
        title,
        completed: false,
        priority,
        createdAt: Date.now(),
      };
      await taskLib.createTask(newTask);
      await fetchTasks(); // Refresh list after adding
    } catch (err) {
      setError("Could not add task.");
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      await taskLib.updateTask(taskId, { completed: !completed });
      await fetchTasks(); // Refresh list after updating
    } catch (err) {
      setError("Could not update task.");
    }
  };

  const removeTask = async (taskId: string) => {
    try {
      await taskLib.deleteTask(taskId);
      await fetchTasks(); // Refresh list after deleting
    } catch (err) {
      setError("Could not delete task.");
    }
  };

  return { 
    tasks: filteredTasks, // Components only see the filtered results
    rawTasks: tasks,      // Useful if you want to show a total count
    filter, 
    setFilter, 
    loading, 
    error, 
    addTask, 
    toggleTask, 
    removeTask 
  };
};