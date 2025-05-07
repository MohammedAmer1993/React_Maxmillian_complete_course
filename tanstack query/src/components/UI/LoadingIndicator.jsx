export default function LoadingIndicator({ center }) {
  return (
    <div
      className="lds-ring"
      style={
        center && { margin: "0 auto", textAlign: "center", display: "block" }
      }
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
