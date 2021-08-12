const { MongoClient } = require("mongodb");

exports.database = () => {
	// Connect to the database
	const client = new MongoClient(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
	client.connect((err) => {
		const collection = client.db("subscriptions").collection("users");

		client.close();
	});
};
