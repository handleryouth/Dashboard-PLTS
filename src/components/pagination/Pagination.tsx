import { useState } from "react";
import { Paginator, PaginatorTemplate } from "primereact/paginator";
import { PaginationProps } from "types";

export default function Pagination({
  handlePageChange,
  page,
  resultsLength,
  className,
}: PaginationProps) {
  const [pageState, setPageState] = useState(page - 1);

  const template: PaginatorTemplate = {
    layout:
      "PrevPageLink PageLinks NextPageLink  RowsPerPageDropdown CurrentPageReport", // The above keys can be set in the desired order.
  };

  return (
    <Paginator
      template={template}
      first={pageState}
      rows={10}
      totalRecords={resultsLength}
      onPageChange={(e) => {
        setPageState(e.first);
        handlePageChange(e.page + 1);
      }}
      className={className}
      currentPageReportTemplate="({last} of {totalRecords})"
    />
  );
}
