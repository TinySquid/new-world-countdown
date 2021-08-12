import Countdown from "./components/Countdown";
import BackgroundSelector from "./components/BackgroundSelector";
import RandomFact from "./components/RandomFact";
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
