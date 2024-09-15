import React from "react";

const SelectField = ({ name, label, value, handleChange, error, touched }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className={`w-full p-2 border ${
          error && touched ? "border-red-500" : "border-gray-300"
        } rounded-lg bg-gray-100 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <option value={0}>0</option>
        <option value={1}>1</option>
      </select>
      {error && touched && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default SelectField;
