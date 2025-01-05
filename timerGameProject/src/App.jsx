import Player from "./components/Player.jsx";
import TimerChallenge from "./components/TimerChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="easy" targetTime={1} />
        <TimerChallenge title="medium" targetTime={5} />
        <TimerChallenge title="pro" targetTime={10} />
        <TimerChallenge title="legends" targetTime={15} />
      </div>
    </>
  );
}

export default App;
