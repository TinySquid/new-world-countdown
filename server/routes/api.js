const { sendNotification } = require("../notification/send-notification");
const { addSubscriber, removeSubscriber } = require("../config/database");

const router = require("express").Router();

/**
 * Status route
 */
router.get("/", (req, res) => {
	res.status(200).json({ status: "Online" });
});

/**
 * Subscribes a user to future push notifications.
 * Push information stored in MongoDB Atlas
 */
router.post("/subscribe", async (req, res) => {
	try {
		const subscriber = req.body;

		if (!subscriber.subscription.endpoint || !subscriber.subscription.keys) {
			res.sendStatus(400);
			return;
		}

		await addSubscriber(subscriber);

		sendNotification(subscriber.subscription, "Success", "To unsubscribe, click the bell icon again.");

		res.sendStatus(201);
	} catch (e) {
		console.log(e);

		res.sendStatus(500);
	}
});

/**
 * Un-subscribes a user from push notifications.
 * Push information deleted from MongoDB Atlas
 */
router.post("/unsubscribe", async (req, res) => {
	try {
		const { id } = req.body;

		await removeSubscriber(id);

		res.sendStatus(200);
	} catch (e) {
		console.log(e);

		res.sendStatus(500);
	}
});

module.exports = router;
