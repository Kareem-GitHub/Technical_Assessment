import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Pagination } from '../components/Pagination';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import { taskService } from '../services/taskService';
import type { Task } from '../types/task.types';

const TASKS_PER_PAGE = 5;

export const Tasks = () => {
  const { logout } = useAuth();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchTasks = async (pageNum = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await taskService.getTasks({ 
        page: pageNum, 
        limit: TASKS_PER_PAGE 
      });
      setTasks(response.data);
      setTotalPages(response.meta.totalPages);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  return (
    <div className="fixed inset-0 overflow-auto bg-gray-50 dark:bg-darkBg">
      <div className="p-6 max-w-4xl mx-auto min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold dark:text-white">My Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Manage your tasks efficiently
            </p>
          </div>
          <button 
            onClick={() => setShowLogoutModal(true)} 
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Logout
          </button>
        </div>

        {/* Task Form */}
        <TaskForm onTaskCreated={() => fetchTasks(page)} />

        {/* Tasks List */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks yet</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Create your first task above
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {tasks.map(task => (
                <TaskItem 
                  key={task.id} 
                  task={task} 
                  onUpdate={() => fetchTasks(page)} 
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination 
                page={page} 
                totalPages={totalPages} 
                setPage={setPage} 
              />
            )}
          </>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Logout
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};