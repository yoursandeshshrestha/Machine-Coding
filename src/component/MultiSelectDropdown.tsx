import React, { useState, useRef, useEffect } from "react";

interface MultiSelectDropdownProps {
  options: string[];
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  placeholder = "Select options",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    let updatedOptions: string[];
    if (selectedOptions.includes(option)) {
      updatedOptions = selectedOptions.filter((item) => item !== option);
    } else {
      updatedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(updatedOptions);
  };

  const removeTag = (option: string) => {
    const updatedOptions = selectedOptions.filter((item) => item !== option);
    setSelectedOptions(updatedOptions);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative w-96" ref={dropdownRef}>
      <div
        className="border border-gray-300 rounded-xl p-2 flex flex-wrap gap-2 cursor-pointer min-h-[48px]"
        onClick={toggleDropdown}
      >
        {selectedOptions.length === 0 && (
          <span className="text-gray-400">{placeholder}</span>
        )}
        {selectedOptions.map((option) => (
          <span
            key={option}
            className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-full text-sm"
          >
            {option}
            <button
              className="text-xs"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(option);
              }}
            >
              ❌
            </button>
          </span>
        ))}
      </div>
      {isOpen && (
        <ul className="absolute mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-md max-h-56 overflow-y-auto z-10">
          {options.map((option) => (
            <li
              key={option}
              className={`p-2 hover:bg-black hover:text-white cursor-pointer ${
                selectedOptions.includes(option) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
