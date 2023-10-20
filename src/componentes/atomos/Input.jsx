// En Input.jsx
import React from 'react';

const Input = ({ type, id, name, value, onChange }) => {
  return <input type={type} id={id} name={name} value={value} onChange={onChange} />;
};

export default Input;  // Exportación por defecto
