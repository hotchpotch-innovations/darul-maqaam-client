"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CMTableFooter from "./CMTableFooter";

type TTHead = {
  _id: string;
  title: string;
};
export type TTableDataProps = {
  pagination: boolean;
  rows: Record<string, any>[] | [];
  table_title: TTHead[];
};

const CM_AllUsersTable = ({
  pagination,
  rows,
  table_title,
}: TTableDataProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 500, maxWidth: "100%" }}
        aria-label="custom pagination table"
      >
        <TableBody>
          <TableRow sx={{ bgcolor: "primary.main" }}>
            {table_title.map((row, index) => (
              <TableCell
                key={row._id}
                style={{
                  width: `${100 / table_title?.length}`,
                  fontSize: "18px",
                }}
                component="th"
                scope="row"
                align={`${index > 1 ? "right" : "left"}`}
              >
                {row?.title}
              </TableCell>
            ))}
          </TableRow>

          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{
                // background: `${index % 2 === 0 ? "" : "lightgray"}`,
                "&:hover": {
                  bgcolor: "lightgray",
                  transitionDuration: "300ms",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell
                style={{ width: `${100 / table_title?.length}%` }}
                align="justify"
              >
                {row.name + index}
              </TableCell>
              <TableCell
                style={{ width: `${100 / table_title?.length}%` }}
                align="right"
              >
                {row.district}
              </TableCell>
              <TableCell
                style={{ width: `${100 / table_title?.length}%` }}
                align="right"
              >
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

        {/* 
        ======================================================================
        This is Table Footer, When Pagination is ture and rows length gatter 
        then 10 then show table footer otherwise footer will be hidden
        ======================================================================
        */}

        {pagination && rows?.length > 10 && (
          <CMTableFooter
            rows={rows}
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        )}
      </Table>
    </TableContainer>
  );
};

export default CM_AllUsersTable;
