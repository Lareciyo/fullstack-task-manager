import { useState, useEffect } from 'react';
import { Task } from '../types/task';
import * as taskLib from '../lib/tasks';

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await taskLib.getTasks(userId);
      setTasks(data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const addTask = async (title: string, priority: Task['priority']) => {
    if (!userId) return;
    const newTask = {
      userId,
      title,
      completed: false,
      priority,
      createdAt: Date.now(),
    };
    await taskLib.createTask(newTask);
    fetchTasks(); // Refresh list
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    await taskLib.updateTask(taskId, { completed: !completed });
    fetchTasks();
  };

  const removeTask = async (taskId: string) => {
    await taskLib.deleteTask(taskId);
    fetchTasks();
  };

  return { tasks, loading, error, addTask, toggleTask, removeTask };
};