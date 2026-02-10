import React, { useState, useEffect } from "react";

const Codetest = () => {
  const [selectInputs, setSelectInputs] = useState([
    { id: 0, categoryType: "", selectedOption: "", textInput: "" },
    { id: 1, categoryType: "", selectedOption: "", textInput: "" },
    { id: 2, categoryType: "", selectedOption: "", textInput: "" },
  ]);
  const options = ["A-SCIENCE", "B-COMMERCE", "C-HUMANITIES"];

  const handleCategoryTypeChange = (id: any, value: any) => {
    const updatedInputs = selectInputs.map((input) => {
      if (input.id === id) {
        return { ...input, categoryType: value };
      }
      return input;
    });
    setSelectInputs(updatedInputs);
  };

  useEffect(() => {
    const fetchData = async (id: any) => {
      try {
        // Simulating API calls
        const response1 = await fetch("api_url_1");
        const response2 = await fetch("api_url_2");
        const data1 = await response1.json();
        const data2 = await response2.json();

        const updatedInputs = selectInputs.map((input) => {
          if (input.id === id) {
            return {
              ...input,
              textInput: data1.value,
              selectedOption: data2.value,
            };
          }
          return input;
        });
        setSelectInputs(updatedInputs);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const selectedInput = selectInputs.find(
      (input) => input.id === selectInputs.length - 1
    );
    if (selectedInput && selectedInput.categoryType !== "") {
      fetchData(selectedInput.id);
    }
  }, [selectInputs]);

  const handleAddInput = () => {
    const newId = selectInputs.length;
    setSelectInputs([
      ...selectInputs,
      { id: newId, categoryType: "", selectedOption: "", textInput: "" },
    ]);
  };

  return (
    <div>
      {selectInputs.map((input) => (
        <div key={input.id}>
          <select
            value={input.categoryType}
            onChange={(e) => handleCategoryTypeChange(input.id, e.target.value)}
          >
            <option value="">Select a category type</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {input.categoryType && (
            <div>
              <select value={input.selectedOption}>
                <option value={input.selectedOption}>
                  {input.selectedOption}
                </option>
              </select>
              <input type="text" value={input.textInput} readOnly />
            </div>
          )}
        </div>
      ))}
      <button onClick={handleAddInput}>Add Select Input</button>
    </div>
  );
};

export default Codetest;
