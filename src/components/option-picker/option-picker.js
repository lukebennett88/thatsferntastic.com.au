import PropTypes from 'prop-types';
import React from 'react';

export const OptionPicker = ({ name, options, onChange, selected }) => {
  if (options.length <= 1) return null;
  return (
    <div>
      <label htmlFor={name.toLowerCase()}>
        <span className="block">{name}</span>
        <select
          onChange={onChange}
          value={selected}
          id={name.toLowerCase()}
          className="form-select"
        >
          {options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

OptionPicker.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.any,
  selected: PropTypes.any,
};
