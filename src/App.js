import Countdown from "./Countdown";
import BackgroundSelector from "./BackgroundSelector";
import RandomFact from "./RandomFact";
import "./App.css";

function App() {
	return (
		<>
			<BackgroundSelector />

			<div className="app">
				<Countdown />
				<RandomFact />
			</div>
		</>
	);
}

export default App;
