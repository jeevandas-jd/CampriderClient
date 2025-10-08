

const Input = ({ label, type = "text", value, onChange, placeholder }) => (
  <div style={{ marginBottom: "15px" }}>
    <label>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ display: "block", width: "100%", padding: "8px" }}
    />
  </div>
);

export default Input;
