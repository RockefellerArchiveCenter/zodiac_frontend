const SummaryListItem = ({ label, value }) => (
  <div className="summary-list__row">
    <dt className="summary-list__key">{label}</dt>
    <dd className="summary-list__value">{value || "None"}</dd>
  </div>
);

const SummaryList = ({ title, items, className }) => (
  <div className={className}>
    {title && <h2>{title}</h2>}
    <dl className="summary-list">
      {items &&
        items.map(
          (i) =>
            i.value && (
              <SummaryListItem key={i.label} label={i.label} value={i.value} />
            ),
        )}
    </dl>
  </div>
);

export default SummaryList;
