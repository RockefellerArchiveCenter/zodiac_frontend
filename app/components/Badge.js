import PropTypes from 'prop-types'

const Badge = ({ color, text }) => (
  <span className={`badge badge--${color}`}>
    {text}
  </span>
)

Badge.propTypes = {
  color: PropTypes.oneOf(['orange', 'blue', 'light-blue']).isRequired,
  text: PropTypes.string.isRequired
}

export default Badge;
