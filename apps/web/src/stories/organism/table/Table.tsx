import type { ReactNode } from "react";
import { Text } from "@components/export/index";
import Pagination from "../../molecule/Pagination/Pagination";

export interface ColumnDef<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  totalEntries?: number;
  currentPage?: number;
  entriesPerPage?: number;
  onPageChange?: (page: number) => void;
}

const Table = <T extends Record<string, any>>({ 
  data, 
  columns,
  totalEntries,
  currentPage,
  entriesPerPage,
  onPageChange
}: TableProps<T>) => {
  return (
    <div className="bg-white rounded-2xl ring-1 ring-gray-100 shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              {columns.map((col, idx) => (
                <th key={idx} className="py-4 px-6 text-xs font-bold text-gray-400 tracking-wider uppercase whitespace-nowrap">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-4 px-6 whitespace-nowrap">
                    {col.render ? (
                      col.render(row)
                    ) : (
                      <Text fontSize="sm" className="font-medium text-gray-600">
                        {String(row[col.key as keyof T])}
                      </Text>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="py-8 text-center">
                  <Text fontSize="sm" className="font-semibold text-gray-400">No entries found.</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Conditionally render pagination if props are provided */}
      {totalEntries !== undefined && currentPage !== undefined && entriesPerPage !== undefined && onPageChange && (
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(totalEntries / entriesPerPage)}
          totalEntries={totalEntries}
          entriesPerPage={entriesPerPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table;
