export default function Input({ labelText, id, error, ...props }) {
  return (
    <div className="control no-margin">
      <label htmlFor={id}>{labelText}</label>
      <input id={id} {...props} />
      {error && <div className="control-error">{error}</div>}
    </div>
  );
}
