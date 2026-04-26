import React from "react";
import { Text, Button } from "@components/export/index";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalEntries: number;
  entriesPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalEntries,
  entriesPerPage,
  onPageChange,
}) => {
  const startEntry = (currentPage - 1) * entriesPerPage + 1;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pages.push(
            <Button
                buttonType={currentPage === i ? "primary" : "tertiary"}
                key={i}
                onClick={() => onPageChange(i)}
                className={`w-8 h-8 px-0 py-0 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  currentPage === i 
                  ? "shadow-sm hover:scale-105 transform" 
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                {i}
            </Button>
        );
    }
    if (totalPages > 4) {
        pages.push(<span key={"ellipsis"} className="px-2 text-gray-400 font-bold">...</span>);
        pages.push(
            <Button
                buttonType={currentPage === totalPages ? "primary" : "tertiary"}
                key={totalPages}
                onClick={() => onPageChange(totalPages)}
                className={`w-8 h-8 px-0 py-0 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                  currentPage === totalPages 
                  ? "shadow-sm hover:scale-105 transform" 
                  : "text-gray-600 hover:bg-gray-100"
                }`}
            >
                {totalPages}
            </Button>
        );
    }
    return pages;
  };

  return (
    <div className="py-4 px-6 border-t border-gray-100 flex items-center justify-between bg-gray-50/20">
      <Text fontSize="sm" className="font-semibold text-gray-400 tracking-wide">
        Showing {startEntry} to {endEntry} of {totalEntries} entries
      </Text>
      <div className="flex items-center gap-2">
        <Button 
          buttonType="tertiary"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1.5 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {renderPageNumbers()}
        </div>
        
        <Button 
          buttonType="tertiary"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1.5 text-sm font-bold text-brand-primary hover:text-green-700 transition-colors"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
