/**
 * Pagination Component
 * 
 * Provides navigation controls for moving between pages of results.
 * Includes previous/next buttons and current page indicator.
 * 
 * @param {Object} props - Component props
 * @param {number} props.page - Current page number
 * @param {number} props.totalPages - Total number of pages available
 * @param {Function} props.onPageChange - Callback function when page changes
 */
function Pagination({ page, totalPages, onPageChange }) {
    /**
     * Handles click on the Previous button
     * Decrements the page number if not on the first page
     */
    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    /**
     * Handles click on the Next button
     * Increments the page number if not on the last page
     */
    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 my-4">
            {/* Previous page button - disabled on first page */}
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            
            {/* Page indicator showing current position */}
            <span className="text-gray-700">
                Page {page} of {totalPages}
            </span>
            
            {/* Next page button - disabled on last page */}
            <button
                onClick={handleNext}
                disabled={page === totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
