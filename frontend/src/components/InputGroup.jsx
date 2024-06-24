
const InputGroup = ({ type, name, value, placeholder, handler }) => {
  return (
    <div className="mb-4">
      <input
        type={type || "text"}
        name={name}
        onInput={handler}
        className="w-full font-medium px-3 py-3 md:px-5 md:py-5 bg-sea-form-1 border border-transparent rounded-full outline-none focus:outline-none focus:border-lagoon-blue placeholder:text-sea-form-2 placeholder:font-medium transition-all duration-300"
        placeholder={placeholder}
        value={value}
        required
      ></input>
    </div>
  );
};

export default InputGroup;
