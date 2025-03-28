const Badge = ({ color, text }) => (
  <span className={`badge badge--${color}`}>{text}</span>
);

export default Badge;
