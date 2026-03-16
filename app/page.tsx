"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useTasks } from "@/hooks/useTasks";
import { logout } from "@/lib/auth";

// Components
import TaskCard from "@/components/tasks/TaskCard";
import TaskForm from "@/components/tasks/TaskForm";
import TaskFilters from "@/components/tasks/TaskFilters";

export default function Home() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  // Pass the real logged-in user's ID to the hook
  const { 
    tasks, 
    filter, 
    setFilter, 
    loading: tasksLoading, 
    addTask, 
    toggleTask, 
    removeTask 
  } = useTasks(user?.uid);

  // PROTECT ROUTE: If not logged in, send to login page
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 animate-pulse">Verifying session...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Area */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Task Manager</h1>
            <p className="text-sm text-gray-500">Logged in as {user.email}</p>
          </div>
          <button 
            onClick={logout}
            className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 px-4 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Input Area */}
        <section className="mb-10">
          <TaskForm onAdd={addTask} />
        </section>

        {/* Filter Area */}
        <TaskFilters 
          currentFilter={filter} 
          onFilterChange={setFilter} 
        />

        {/* Tasks List Area */}
        <div className="space-y-3">
          {tasksLoading ? (
            <div className="text-center py-10 text-gray-400">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 bg-white border border-dashed rounded-xl">
              <p className="text-gray-400">No {filter !== 'all' ? filter : ''} tasks found.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={toggleTask} 
                onDelete={removeTask} 
              />
            ))
          )}
        </div>

        {/* Footer Stats */}
        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
             Built with Next.js + Firebase
          </p>
        </div>
      </div>
    </main>
  );
}