"use client";
import React from "react";

type TProps = {
  states: any;
  setStates: any;
  firstFieldName: string;
  secondFieldName: string;
  label?: string;
  labelStyle?: string;
};

const CMMultipleTwoFieldInput = ({
  states = [{}],
  setStates,
  firstFieldName = "first",
  secondFieldName = "second",
  label = "Properties",
  labelStyle = "text-gray-500",
}: TProps) => {
  const addHandler = () => {
    setStates([...states, { [firstFieldName]: "", [secondFieldName]: "" }]);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target; // Get the input name (label or url) and value
    const all_state = [...states];
    all_state[i] = { ...all_state[i], [name]: value }; // Update the corresponding field in the specific object
    setStates(all_state);
  };

  const deleteHandler = (i: number) => {
    const all_state = [...states];
    all_state.splice(i, 1);
    setStates(all_state);
  };

  return (
    <>
      <div className="mb-2 flex justify-between items-center">
        <div>
          <p className={`font-medium text-base ${labelStyle}`}>{label}</p>
        </div>
        <div>
          <button
            className="border-2 border-gray-300 px-4 text-green-600 rounded-[4px] hover:text-white bg-white hover:bg-green-600 duration-500 py-[2px] "
            onClick={addHandler}
          >
            Add
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {states.map((data: any, i: number) => {
          return (
            <div key={i} className="space-y-2">
              <div className={"flex justify-between items-start"}>
                <div>
                  <p className="text-gray-500 text-sm font-medium">
                    Property - {i + 1}
                  </p>
                </div>
                <div>
                  <button
                    className="px-4  border-2 border-gray-300 text-red-400 hover:text-white font-medium bg-white hover:bg-red-500 duration-500 rounded-[4px]"
                    onClick={() => deleteHandler(i)}
                  >
                    x
                  </button>
                </div>
              </div>
              <div className="flex space-x-1">
                <input
                  className="w-full border py-1 rounded-sm text-gray-500 pl-2 focus:outline-none focus:ring focus:ring-green-200"
                  name={firstFieldName}
                  value={data[firstFieldName] || ""}
                  onChange={(e) => changeHandler(e, i)}
                  placeholder={
                    firstFieldName === "label" ? "Label" : "First Field"
                  }
                />
                <input
                  className="w-full border py-1 rounded-sm text-gray-500 pl-2 focus:outline-none focus:ring focus:ring-green-200"
                  name={secondFieldName}
                  value={data[secondFieldName] || ""}
                  onChange={(e) => changeHandler(e, i)}
                  placeholder={
                    secondFieldName === "url" ? "URL" : "Second Field"
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CMMultipleTwoFieldInput;
