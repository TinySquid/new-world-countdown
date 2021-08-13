import { useState } from "react";

import { urlBase64ToUint8Array } from "../utils/urlBase64ToUint8Array";

import { unregister } from "../serviceWorkerRegistration";

import { FiBell, FiBellOff } from "react-icons/fi";

function Subscribe() {
	// TODO Change to local storage hook
	const [subscribed, setSubscribed] = useState(JSON.parse(window.localStorage.getItem("subscribed")));

	async function registerNotifications() {
		// Subscribe to push notifications
		setSubscribed(true);
		window.localStorage.setItem("subscribed", true);

		const registration = await navigator.serviceWorker.ready;

		const subscription = await registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)
		});

		await fetch(`${process.env.REACT_APP_API}/subscribe`, {
			method: "POST",
			body: JSON.stringify({ id: window.localStorage.getItem("id"), subscription: subscription }),
			headers: { "content-type": "application/json" }
		});
	}

	async function unregisterNotifications() {
		// Unsubscribe from push notifications
		setSubscribed(false);
		window.localStorage.setItem("subscribed", false);

		// Guarantee notifications stop locally
		unregister();

		// Remove subscriber from backend
		await fetch(`${process.env.REACT_APP_API}/unsubscribe`, {
			method: "POST",
			body: JSON.stringify({ id: window.localStorage.getItem("id") }),
			headers: { "content-type": "application/json" }
		});
	}

	return (
		<div id="subscribe">
			{subscribed ? <FiBellOff onClick={unregisterNotifications} /> : <FiBell onClick={registerNotifications} />}
		</div>
	);
}

export default Subscribe;
