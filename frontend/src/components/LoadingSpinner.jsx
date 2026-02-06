const LoadingSpinner = ({ label = "Loading" }) => (
  <div style={{ display: "inline-flex", flexDirection: "column", gap: "12px", alignItems: "center" }}>
    <div className="spinner" />
    <span style={{ color: "#a9b4d6" }}>{label}...</span>
  </div>
);

export default LoadingSpinner;
