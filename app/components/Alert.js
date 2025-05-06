const Alert = ({ color = "orange", icon = "error_outline", message }) => (
  <div className={`alert alert--${color}`}>
    <span className="alert__icon" aria-hidden="true">
      {icon}
    </span>
    <div>
      <p className="alert__text">{message}</p>
    </div>
  </div>
);

export default Alert;
