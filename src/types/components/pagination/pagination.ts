export interface PaginationProps {
  page: number;
  handlePageChange: (page: number) => void;
  resultsLength: number;
  rows?: number;
  className?: string;
}
