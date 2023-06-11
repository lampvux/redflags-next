import React from "react";

type Flag = {
  id: number;
  description: string;
  type: string;
  hint: string;
};

type FlagProps = {
  flags: Flag[];
};

export default function Flags({ flags }: FlagProps) {
  return (
    <div className="flex justify-center content-center my-2">
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Descriptions</th>
            <th className="px-4 py-2">Hint</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {flags.map((flag) => (
            <tr>
              <td className="border px-4 py-2">{flag.description}</td>
              <td className="border px-4 py-2">{flag.hint}</td>
              <td className="border px-4 py-2">{flag.type}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                  Edit
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
