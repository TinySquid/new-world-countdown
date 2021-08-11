import { useState, useEffect, useRef } from "react";

import "./App.css";

const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;

const endDate = "Sept 28, 2021 09:00:00";
const countdown = new Date(endDate).getTime();

const initialDistance = getDistance();

function getDistance() {
	let now = new Date().getTime();
	return countdown - now;
}

function getRemaining(distance) {
	return {
		days: Math.floor(distance / day),
		hours: Math.floor((distance % day) / hour),
		minutes: Math.floor((distance % hour) / minute),
		seconds: Math.floor((distance % minute) / second)
	};
}

function App() {
	const headlineRef = useRef();
	const countdownRef = useRef();

	const [state, setState] = useState(getRemaining(initialDistance));

	useEffect(() => {
		const interval = setInterval(() => {
			const distance = getDistance();

			setState(getRemaining(distance));

			if (distance < 0) {
				console.log("00:00:00");
			}
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="app">
			<h1 id="countdown-header" ref={headlineRef}>
				Countdown to New World:
			</h1>
			<div id="countdown" ref={countdownRef}>
				<ul>
					<li>
						<span id="days">{state.days}</span>days
					</li>
					<li>
						<span id="hours">{state.hours}</span>Hours
					</li>
					<li>
						<span id="minutes">{state.minutes}</span>Minutes
					</li>
					<li>
						<span id="seconds">{state.seconds}</span>Seconds
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
