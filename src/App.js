import Countdown from "./Countdown";
import BackgroundSelector from "./BackgroundSelector";

import "./App.css";

function App() {
	return (
		<>
			<BackgroundSelector />

			<div className="app">
				<Countdown />
			</div>
		</>
	);
}

export default App;
