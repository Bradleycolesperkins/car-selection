function Pagination({ page, totalPages, onPageChange }) {
    const handlePrev = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 my-4">
            <button
                onClick={handlePrev}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-700">
        Page {page} of {totalPages}
      </span>
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
