import { TableFooter, TablePagination, TableRow } from "@mui/material";
import React from "react";
import TablePaginationActions from "./CMTablePagination";

type TTableFooterProps = {
  rows: Record<string, any>[] | [];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  rowsPerPage: number;
};

const CMTableFooter = ({
  rows,
  setRowsPerPage,
  setPage,
  page,
  rowsPerPage,
}: TTableFooterProps) => {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
          colSpan={3}
          count={rows?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          slotProps={{
            select: {
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            },
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  );
};

export default CMTableFooter;
