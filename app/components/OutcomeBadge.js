// Badge component that assigns color and text values based on the "outcome"
// value, which is defined in a page-specific context.
const OutcomeBadge = ({ outcome }) => {
  let badgeColor = "light-blue";

  if (["COMPLETE", "SUCCESS"].includes(outcome)) {
    badgeColor = "blue";
  } else if (["FAILURE", "ERROR"].includes(outcome)) {
    badgeColor = "orange";
  }

  return (
    <span className={`badge badge--${badgeColor}`}>STATUS: {outcome}</span>
  );
};

export default OutcomeBadge;
