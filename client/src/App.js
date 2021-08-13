import { useEffect } from "react";

import Countdown from "./components/Countdown";
import BackgroundSelector from "./components/BackgroundSelector";
import RandomFact from "./components/RandomFact";
import Footer from "./components/Footer";

import { v4 as uuidv4 } from "uuid";

import "./App.css";

function App() {
	// Client ID
	useEffect(() => {
		if (window.localStorage.getItem("id")) {
			return;
		} else {
			window.localStorage.setItem("id", uuidv4());
		}
	}, []);

	return (
		<>
			<BackgroundSelector />

			<div className="app">
				<Countdown />
				{/* <RandomFact /> */}
				<Footer />
			</div>
		</>
	);
}

export default App;
