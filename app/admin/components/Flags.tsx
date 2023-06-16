"use client";
import React, { use, useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Flex } from "@chakra-ui/react";

type Flag = {
  id: number;
  description: string;
  type: string;
  hint: string;
};

type FlagProps = {
  flags: Flag[];
};

const columnHelper = createColumnHelper<any>();
const handleEditRow = () => {};
const handleDeleteRow = () => {};
const columns = [
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "Description",
  }),
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: "Type",
  }),
  columnHelper.accessor("hint", {
    cell: (info) => info.getValue(),
    header: "Hint",
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => (
      <Flex>
        <button onClick={handleEditRow}>Edit</button>
        <button onClick={handleDeleteRow}>Delete</button>
      </Flex>
    ),
  }),
];
export default function Flags({ flags }: FlagProps) {
  return (
    <Flex marginY={"20px"}>
      <DataTable columns={columns} data={flags} />
    </Flex>
  );
}
