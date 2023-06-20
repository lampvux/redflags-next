"use client";
import React from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "./DataTable";
import { Badge, Button, Flex, Spacer } from "@chakra-ui/react";
import { flagType } from "../../types";
import { deleteDocument } from "../../firebase/firestore";

export type Flag = {
  id: number;
  description: string;
  type: string;
  hint: string;
};

type FlagProps = {
  flags: Flag[];
};

const columnHelper = createColumnHelper<any>();
const handleEditRow = (id: string, type: string) => {};
const handleDeleteRow = (id: string, type: string) => {
  try {
    deleteDocument(id, type);
  } catch (error) {
    console.log("error when deleting document", error);
  }
};
const columns = [
  columnHelper.accessor("description", {
    cell: (info) => info.getValue(),
    header: "Description",
  }),
  columnHelper.accessor("type", {
    cell: (info) =>
      info.getValue() == flagType.redFlags ? (
        <Badge colorScheme="red">Red</Badge>
      ) : (
        <Badge>White</Badge>
      ),
    header: "Type",
  }),
  columnHelper.accessor("hint", {
    cell: (info) => info.getValue(),
    header: "Hint",
  }),
  columnHelper.display({
    id: "actions",
    cell: (props) => {
      console.log("props", props);
      return (
        <Flex>
          <Button
            onClick={() =>
              handleEditRow(props.row.original.id, props.row.original.type)
            }
          >
            Edit
          </Button>
          <Spacer />
          <Button
            onClick={() =>
              handleDeleteRow(props.row.original.id, props.row.original.type)
            }
          >
            Delete
          </Button>
        </Flex>
      );
    },
  }),
];
export default function Flags({ flags }: FlagProps) {
  return (
    <Flex marginY={"20px"}>
      <DataTable columns={columns} data={flags} />
    </Flex>
  );
}
