const { sendNotification } = require("./send-notification");
const { fetchAllSubscriptions } = require("../config/database");

/**
 * Sends a countdown update to all subscribers.
 */
async function sendNormalNotificationToAll() {
	const minute = 1000 * 60,
		hour = minute * 60,
		day = hour * 24;

	const countdown = new Date("Sept 28, 2021 09:00:00").getTime();

	const now = new Date().getTime();

	const distance = countdown - now;

	const r = {
		days: Math.floor(distance / day),
		hours: Math.floor((distance % day) / hour),
		minutes: Math.floor((distance % hour) / minute)
	};

	try {
		const { client, cursor } = await fetchAllSubscriptions();

		await cursor.forEach((subscriber) => {
			sendNotification(
				subscriber.subscription,
				"New World Update",
				`${r.days} days, ${r.hours} hours, ${r.minutes} minutes until the official release of New World.`
			);
		});

		client.close();
	} catch (e) {
		console.log(e);
		client.close();
	}
}

/**
 * Sends the final release notification to all subscribers.
 */
async function sendReleaseNotificationToAll() {
	try {
		const { client, cursor } = await fetchAllSubscriptions();

		await cursor.forEach((subscriber) => {
			sendNotification(subscriber.subscription, "New World Update", "NEW WORLD IS OUT NOW!");
		});

		client.close();
	} catch (e) {
		console.log(e);
		client.close();
	}
}

// Notifications get sent out every day at 9AM PST.
// Cooldown prevents repeated notifications during the same hour.
let cooldown = false;

const notificationDispatcher = setInterval(() => {
	const currentHour = new Date().getUTCHours();
	const currentDay = new Date().getUTCDate();

	if (!cooldown) {
		if (currentHour === 16) {
			if (currentDay === 28) {
				console.log("sending release notifications");
				sendReleaseNotificationToAll();

				clearInterval(notificationDispatcher);
			} else {
				console.log("sending notifications");
				sendNormalNotificationToAll();

				cooldown = true;

				setTimeout(() => {
					cooldown = false;
				}, 1000 * 60 * 60);
			}
		}
	}
}, 1000);
