function Input(props) {
  const {
    labelName,
    errorName,
    inputName,
    inputType,
    inputValue,
    inputHandler,
  } = props;
  return (
    <div className="flex flex-col relative">
      <label className="text-marine-blue mb-1">{labelName}</label>
      <span className="absolute right-0 text-strawberry-red">{errorName}</span>
      <input
        name={inputName}
        className={`text-marine-blue font-ubuntu-medium border border-cool-gray p-3 rounded-md hover:border-purplish-blue cursor-pointer ${
          errorName && "border-strawberry-red"
        }`}
        type={inputType}
        placeholder="e.g. Stephen King"
        value={inputValue}
        onChange={inputHandler}
      />
    </div>
  );
}

export default Input;
