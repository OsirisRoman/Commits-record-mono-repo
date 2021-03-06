const DropDownList = ({ defaultText, options, setSelectedBranch }) => {
  return (
    <label>
      Select a branch:
      <select
        className="ms-3"
        value={defaultText}
        onChange={e => setSelectedBranch(e.target.value)}>
        <option value={defaultText} style={{ display: "none" }}>
          {defaultText}
        </option>
        {options.map((option, index) => (
          <option key={`key${index}`} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropDownList;
