import { useState } from "react";

import { urlBase64ToUint8Array } from "../utils/urlBase64ToUint8Array";

import { FiBell, FiBellOff } from "react-icons/fi";

function Subscribe() {
	// TODO Change to local storage hook
	const [subscribed, setSubscribed] = useState(window.localStorage.getItem("subscribed"));

	async function registerNotifications() {
		// Subscribe to push notifications
		const registration = await navigator.serviceWorker.ready;

		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)
		});

		const response = await fetch(`${process.env.REACT_APP_API}/subscribe`, {
			method: "POST",
			body: JSON.stringify({ id: window.localStorage.getItem("id"), subscription: subscription }),
			headers: { "content-type": "application/json" }
		});

		if (response.status === 201) {
			setSubscribed(true);
			window.localStorage.setItem("subscribed", true);
		}
	}

	async function unregisterNotifications() {
		// Unsubscribe from push notifications
		const response = await fetch(`${process.env.REACT_APP_API}/unsubscribe`, {
			method: "POST",
			body: JSON.stringify({ id: window.localStorage.getItem("id") }),
			headers: { "content-type": "application/json" }
		});

		if (response.status === 200) {
			setSubscribed(false);
			window.localStorage.setItem("subscribed", false);
		}
	}

	return (
		<div id="subscribe">
			{subscribed ? <FiBellOff onClick={unregisterNotifications} /> : <FiBell onClick={registerNotifications} />}
		</div>
	);
}

export default Subscribe;
