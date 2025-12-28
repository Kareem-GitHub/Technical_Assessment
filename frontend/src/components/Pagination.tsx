export const Pagination = ({ page, totalPages, setPage }: any) => {
  return (
    <div className="flex items-center justify-center gap-3 mt-6 mb-4">
      <button 
        disabled={page <= 1} 
        onClick={() => setPage(page - 1)} 
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Previous
      </button>
      <span className="px-4 py-2 text-gray-700 dark:text-gray-200 font-medium">
        Page {page} of {totalPages}
      </span>
      <button 
        disabled={page >= totalPages} 
        onClick={() => setPage(page + 1)} 
        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        Next
      </button>
    </div>
  );
};