import React from 'react';

const InputGroup = ({ type, name, value, placeholder, handler, icon, className="bg-sea-form-1 px-3 py-3 md:px-4 md:py-5 md:text-lg" }) => {
  return (
    <div className="mb-4">
      <label className={`flex items-center w-full border border-transparent rounded-3xl focus-within:border-lagoon-blue transition-all duration-300 ${className}`}>
        {icon && <span className="pe-3">{icon}</span>}
        <input
          type={type || "text"}
          name={name}
          onInput={handler}
          className="flex-grow font-medium bg-transparent placeholder:text-sea-form-2 placeholder:font-medium outline-none focus:outline-none text-inherit"
          placeholder={placeholder}
          value={value}
          required
        />
      </label>
    </div>
  );
};

export default InputGroup;
