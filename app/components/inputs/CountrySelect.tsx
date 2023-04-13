"use client";

// create export type CountrySelectValue with schema from hook useCountries
// create interface with  value(schema) + on CHange input with schema
// create select(selfclosing) with options of all countries
// create format option label as a custom list with flag label and region
// customize select(control input and opiton ) with className
// add theme to id

import React from "react";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll, getByValue } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option: any) => (
        <div
          className="flex flex-row items-center gap-3 text-dark
          "
        >
          <p className="">{option.flag}</p>
          <div className="">{option.label}</div>
          <div className="text-dark/40">{option.region}</div>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "#dfdfff",
          primary25: "#f6f6ff",
        },
      })}
    />
  );
};

export default CountrySelect;
