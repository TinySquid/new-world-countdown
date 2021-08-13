const { MongoClient } = require("mongodb");

exports.addSubscriber = async (subscriber) => {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	try {
		// Connect, Write, Close
		await client.connect();

		const collection = client.db("subscriptions").collection("users");

		await collection.insertOne(subscriber);
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
};

exports.removeSubscriber = async (id) => {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	try {
		// Connect, Delete, Close
		await client.connect();

		const collection = client.db("subscriptions").collection("users");

		await collection.deleteOne({ id: id });
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
};

exports.fetchAllSubscriptions = async () => {
	const client = new MongoClient(process.env.DB_CONNECTION_STRING, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	try {
		// Connect, Fetch, Close
		await client.connect();

		const collection = client.db("subscriptions").collection("users");

		const cursor = await collection.find();

		const subscribers = [];

		await cursor.forEach((subscriber) => subscribers.push(subscriber.subscription));

		return subscribers;
	} catch (e) {
		console.log(e);
	} finally {
		await client.close();
	}
};
