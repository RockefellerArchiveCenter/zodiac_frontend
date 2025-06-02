// Badge component that assigns color and text values based on the "outcome"
// value, which is defined in a page-specific context.
const OutcomeBadge = ({ outcome }) => {
  let badgeColor = "light-blue";
  let badgeText = "IN PROCESS";

  if (outcome === "SUCCESS") {
    badgeColor = "blue";
    badgeText = outcome;
  } else if (outcome === "FAILURE") {
    badgeColor = "orange";
    badgeText = outcome;
  }

  return (
    <span className={`badge badge--${badgeColor}`}>STATUS: {badgeText}</span>
  );
};

export default OutcomeBadge;
