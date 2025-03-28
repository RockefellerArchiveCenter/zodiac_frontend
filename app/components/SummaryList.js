export const SummaryListItem = ({ label, value }) => (
  <div className="summary-list__row">
    <dt className="summary-list__key">{label}</dt>
    <dd className="summary-list__value">{value}</dd>
  </div>
);

export const SummaryList = ({ title, children }) => (
  <div className="card">
    {title && <h2>{title}</h2>}
    <dl className="summary-list">{children}</dl>
  </div>
);
