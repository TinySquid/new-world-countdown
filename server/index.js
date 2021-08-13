// Imports
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const router = require("./routes/api");

// Setup
const app = express();
const port = process.env.PORT || 8000;

// Cors
const whitelist = [process.env.CLIENT];

const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	optionsSuccessStatus: 200
};

if (process.env.NODE_ENV !== "production") {
	app.use(cors());
} else {
	app.use(cors(corsOptions));
}

app.use(helmet());

app.use(express.json());

// API Routing
app.use("/api", router);

// Start
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
