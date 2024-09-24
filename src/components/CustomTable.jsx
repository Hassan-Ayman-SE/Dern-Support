import React from "react";

const CustomTable = ({ headers, data, renderRow, isWhite = true }) => {
  return (
    <table
      className={`w-full ${isWhite ? "bg-customWhite" : "bg-customBlueLightBg"} border-none rounded-lg shadow-lg overflow-hidden h-full mt-4`}
    >
      <thead className="bg-customBlueDark text-customWhite">
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              className="p-4 text-left border-b-2 border-customDarkGray uppercase font-semibold tracking-wide"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-customDarkGray">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-customBlueLight transition-colors duration-200">
            {renderRow(item)}
          </tr>
        ))}
      </tbody>
    </table>
  );


};

export default CustomTable;
