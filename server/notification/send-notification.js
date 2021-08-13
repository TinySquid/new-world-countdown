const webpush = require("web-push");

webpush.setVapidDetails(process.env.MAILTO_STRING, process.env.VAPID_KEY_PUBLIC, process.env.VAPID_KEY_PRIVATE);

exports.sendNotification = (subscription, title, body) => {
	webpush.sendNotification(
		subscription,
		JSON.stringify({
			title,
			body
		})
	);
};
