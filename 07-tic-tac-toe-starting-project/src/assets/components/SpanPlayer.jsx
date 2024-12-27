export default function SpanPlayer({ classVal, player, symbol, ...props }) {
  return (
    <span>
      <span className="player-name">{player}</span>
      <span className="player-symbol">{symbol}</span>
    </span>
  );
}
