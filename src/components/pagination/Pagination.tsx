import {
  Paginator,
  PaginatorPageState,
  PaginatorTemplate,
} from "primereact/paginator";

export interface PaginationProps {
  page: number;
  handlePageChange: (event: PaginatorPageState) => void;
  resultsLength: number;
  rows?: number;
  className?: string;
}

export default function Pagination({
  handlePageChange,
  page,
  resultsLength,
  rows = 10,
  className,
}: PaginationProps) {
  const template: PaginatorTemplate = {
    layout:
      "PrevPageLink PageLinks NextPageLink  RowsPerPageDropdown CurrentPageReport", // The above keys can be set in the desired order.
  };

  return (
    <Paginator
      template={template}
      first={page}
      rows={rows}
      totalRecords={resultsLength}
      onPageChange={handlePageChange}
      className={className}
      currentPageReportTemplate="({last} of {totalRecords})"
    />
  );
}
