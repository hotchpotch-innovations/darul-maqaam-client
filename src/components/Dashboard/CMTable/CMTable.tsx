"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePaginationActions from "./CMTablePagination";
import CMTableFooter from "./CMTableFooter";

export type TTableDataProps = {
  pagination?: boolean;
  rows: Record<string, any>[];
};

const CMTable = ({ pagination, rows }: TTableDataProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const handleChangePage = (
  //   event: React.MouseEvent<HTMLButtonElement> | null,
  //   newPage: number
  // ) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            <TableCell component="th" scope="row">
              {"ID"}
            </TableCell>
            <TableCell style={{ width: 160 }} align="justify">
              {"Name"}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {"District"}
            </TableCell>
            <TableCell style={{ width: 160 }} align="right">
              {"Phone"}
            </TableCell>
          </TableRow>

          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any, index: number) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell style={{ width: `${100 / 4}%` }} align="justify">
                {row.name + index}
              </TableCell>
              <TableCell style={{ width: `${100 / 4}%` }} align="right">
                {row.district}
              </TableCell>
              <TableCell style={{ width: `${100 / 4}%` }} align="right">
                {row.phone}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        {pagination && (
          <CMTableFooter
            rows={rows}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
          // <TableFooter>
          //   <TableRow>
          //     <TablePagination
          //       rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
          //       colSpan={3}
          //       count={rows.length}
          //       rowsPerPage={rowsPerPage}
          //       page={page}
          //       slotProps={{
          //         select: {
          //           inputProps: {
          //             "aria-label": "rows per page",
          //           },
          //           native: true,
          //         },
          //       }}
          //       onPageChange={handleChangePage}
          //       onRowsPerPageChange={handleChangeRowsPerPage}
          //       ActionsComponent={TablePaginationActions}
          //     />
          //   </TableRow>
          // </TableFooter>
        )}
      </Table>
    </TableContainer>
  );
};

export default CMTable;
