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
  type: PropTypes.oneOf(['button', 'submit', 'reset']).isRequired,
  color: PropTypes.oneOf([
    'light-blue', 
    'blue', 
    'navy', 
    'orange', 
    'transparent', 
    'gray', 
    'dark-gray', 
    'black']).isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']).isRequired,
  handleClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  ariaHasPopup: PropTypes.string,
  ariaExpanded: PropTypes.string,
  ariaPressed: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired
}

export default Button