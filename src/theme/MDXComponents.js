import React from "react";
import MDXComponents from "@docusaurus/theme-classic/lib/theme/MDXComponents";

const TableWrapper = ({ children }) => {
  return (
    <div className="table-wrapper">
      <table>{children}</table>
    </div>
  );
};

const CustomMDXComponents = {
  ...MDXComponents,
  table: TableWrapper,
};

export default CustomMDXComponents;
