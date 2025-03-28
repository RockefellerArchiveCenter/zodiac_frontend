const Alert = ({ color = "orange", icon = "error_outline", message }) => {
  const alertClass = `alert alert--${color}`;
  const iconClass = `alert__icon`;

  return (
    <div className={alertClass} role="status">
      <span className={iconClass} aria-hidden="true">
        {icon}
      </span>
      <div>
        <p className="alert__text">{message}</p>
      </div>
    </div>
  );
};

export default Alert;
