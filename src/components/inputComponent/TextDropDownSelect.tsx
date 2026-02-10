import React, { useRef, useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

function TextDropDownSelect(props: any) {
  const [selectedIndex, setSelectedIndex]: any = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef: any = useRef(null);
  const inputRef: any = useRef(null);

  const handleKeyDown = (event: any) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((selectedIndex: any) => {
        return selectedIndex + 1 >= props.dropDownListValues?.length
          ? 0
          : selectedIndex + 1;
      });
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((selectedIndex: any) => {
        return selectedIndex - 1 < 0
          ? props.dropDownListValues?.length - 1
          : selectedIndex - 1;
      });
    }
  };
  useEffect(() => {
    dropdownRef.current?.focus();
  }, []);
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsInputFocused(false);
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef, dropdownRef]);
  return (
    <div className="custom">
      <input
        type={props.type}
        className={props.className}
        autoComplete={props.autoComplete}
        required={props.required}
        name={props.name}
        placeholder={props.placeHolder}
        ref={inputRef}
        onFocus={() => {
          setIsInputFocused(true);
          setIsDropdownOpen(true);
        }}
        onBlur={() => setIsInputFocused(false)}
        onChange={(e) => props.handleValueChange(e)}
        value={props.value}
      />
      <div
        className="custom-dropdown-icon"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FaChevronDown />
      </div>
      {isDropdownOpen && (
        <ul
          className="custom-dropdown"
          tabIndex={0}
          ref={dropdownRef}
          onKeyDown={(e: any) => handleKeyDown(e)}
        >
          {props.dropDownListValues?.map((items: any, index: number) => {
            return (
              <li
                className={`custom-dropdown-options ${
                  selectedIndex === index ? "selected" : ""
                }`}
                key={index}
                onClick={() => {
                  props.handleDropDownChange(items);
                  setIsDropdownOpen(false);
                }}
              >
                {items}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default TextDropDownSelect;
