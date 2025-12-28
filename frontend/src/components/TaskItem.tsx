import { useState } from 'react';
import { taskService } from '../services/taskService';
import { formatDate } from '../utils/dateUtils';
import type { Task } from '../types/task.types';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
}

export const TaskItem = ({ task, onUpdate }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleDelete = async () => {
    await taskService.deleteTask(task.id);
    setShowDeleteModal(false);
    onUpdate();
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await taskService.updateTaskStatus(task.id, e.target.value as Task['status']);
    onUpdate();
  };

  const handleUpdate = async () => {
    await taskService.updateTask(task.id, { title, description });
    setIsEditing(false);
    onUpdate();
  };

  const handleCancel = () => {
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(false);
  };

  const getStatusStyle = (status: Task['status']): string => {
    const styles = {
      done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      in_progress: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
    };
    return styles[status];
  };

  const getStatusLabel = (status: Task['status']): string => {
    const labels = {
      in_progress: 'In Progress',
      done: 'Done',
      pending: 'Pending'
    };
    return labels[status];
  };

  if (isEditing) {
    return (
      <div className="border border-gray-300 dark:border-gray-600 p-4 mb-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Task title"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="border border-gray-300 dark:border-gray-600 p-2 rounded-md w-full mb-3 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          placeholder="Description"
        />
        <div className="flex gap-2">
          <button 
            onClick={handleUpdate} 
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Save
          </button>
          <button 
            onClick={handleCancel} 
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border border-gray-200 dark:border-gray-700 p-4 mb-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-lg dark:text-white truncate">
                {task.title}
              </h3>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(task.status)}`}>
                {getStatusLabel(task.status)}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              {task.description}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs">
              Created: {formatDate(task.createdAt)}
            </p>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <select 
              value={task.status} 
              onChange={handleStatusChange} 
              className="border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button 
              onClick={() => setIsEditing(true)} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              Edit
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)} 
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Delete Task
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete "<strong>{task.title}</strong>"?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};