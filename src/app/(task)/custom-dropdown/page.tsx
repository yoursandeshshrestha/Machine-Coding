"use client";
import MultiSelectDropdown from "@/component/MultiSelectDropdown";
import React from "react";

const Page: React.FC = () => {
  const options = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

  return (
    <div className="p-8 flex flex-col justify-between items-center">
      <h2 className="text-2xl mb-4">Multi-Select Dropdown</h2>
      <MultiSelectDropdown options={options} />
    </div>
  );
};

export default Page;
