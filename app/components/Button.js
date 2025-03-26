import PropTypes from 'prop-types'

const Button = props => (
  <button
    type={props.type}
    className={`btn btn--${props.color} btn--${props.size}`}
    onClick={props.handleClick}
    aria-label={props.ariaLabel}
    aria-haspopup={props.ariaHasPopup}
    aria-expanded={props.ariaExpanded}
    aria-pressed={props.ariaPressed}
    disabled={props.disabled} >
      {props.label}
  </button>)

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  color: PropTypes.oneOf([
    'light-blue', 
    'blue', 
    'navy', 
    'orange', 
    'transparent', 
    'gray', 
    'dark-gray', 
    'black']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
  handleClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  ariaHasPopup: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaPressed: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string
}

export default Button