import React from 'react';

const FieldEditor = ({ field, label, value, onChange }) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={`Enter ${label}`}
      />
    </div>
  );
};

export default FieldEditor;
