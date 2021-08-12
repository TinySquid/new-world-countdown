import { useState } from "react";

import facts from "./assets/facts.json";

function RandomFact() {
	const [fact, setFact] = useState(getFact());

	function getFact() {
		const id = Math.floor(Math.random() * facts.length);

		return facts[id].text;
	}

	const nextFact = () => {
		setFact(getFact());
	};

	return (
		<div id="fact-container">
			<h2>Random Fact</h2>
			<p>{fact}</p>
			<button onClick={nextFact}>Next Fact</button>
		</div>
	);
}

export default RandomFact;
