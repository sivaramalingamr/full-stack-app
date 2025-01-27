import React, { useState } from "react";
import PropTypes from "prop-types";

export default function Form({ formElements }) {
  return (
    <div>
      {formElements.map((elem, index) => {
        return (
          <div className="form-elem" key={elem.id}>
            <label htmlFor={elem.name}>{elem.label}:</label>
            <input
              key={elem.id}
              type={elem.type}
              id={elem.id}
              name={elem.name}
              required={elem.required}
              value={elem.value}
              onChange={(e) => elem.onChange(e)}
            />
          </div>
        );
      })}
    </div>
  );
}

Form.propTypes = {
  formElements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      onChange: PropTypes.func.isRequired,
    })
  ).isRequired,
};
