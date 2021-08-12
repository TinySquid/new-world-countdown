const express = require("express");
const { sendNotification } = require("./config/notification");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.post("/subscribe", (req, res) => {
	try {
		const { id, subscription } = req.body;

		sendNotification(subscription);

		// TODO Add user to subscriptions table

		res.sendStatus(201);
	} catch (e) {
		console.log(e);
	}
});

app.post("/unsubscribe", (req, res) => {
	const { id } = req.body;

	// TODO Remove user from subscriptions table
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
