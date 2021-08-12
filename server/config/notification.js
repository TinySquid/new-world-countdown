const webpush = require("web-push");

webpush.setVapidDetails(process.env.MAILTO_STRING, process.env.VAPID_KEY_PUBLIC, process.env.VAPID_KEY_PRIVATE);

exports.sendNotification = (subscription) => {
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

	webpush.sendNotification(
		subscription,
		JSON.stringify({
			title: "New World",
			body: `${r.days} days, ${r.hours} hours, ${r.minutes} minutes until the official release of New World.`
		})
	);
};
