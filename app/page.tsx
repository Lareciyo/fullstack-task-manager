"use client";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { logout } from "@/lib/auth";
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, loading: tasksLoading, addTask, toggleTask, removeTask } = useTasks(user?.uid);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) return <div className="text-center p-20">Checking authentication...</div>;
  if (!user) return null;

  return (
    <main className="max-w-2xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
      </div>
      
      <TaskForm onAdd={addTask} />

      <div className="mt-8 space-y-4">
        {tasksLoading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onToggle={toggleTask} onDelete={removeTask} />
          ))
        )}
      </div>
    </main>
  );
}