const Button = (props) => (
  <button
    type={props.type}
    className={`btn ${props.className}`}
    onClick={props.handleClick}
    aria-label={props.ariaLabel}
    aria-haspopup={props.ariaHasPopup}
    aria-expanded={props.ariaExpanded}
    aria-pressed={props.ariaPressed}
    disabled={props.disabled}
  >
    {props.label}
  </button>
);

export default Button;
