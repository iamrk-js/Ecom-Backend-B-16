const mongoose = require('mongoose');

let isConnected = false;

const ConnectMongo = async () => {
  if (isConnected) {
    console.log('🔁 Using existing DB connection');
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error('❌ MONGO_URI not defined in env');
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
};

// module.exports = connectDB;

function checkConnectionStatus() {
	const status = mongoose.connection.readyState;
	const statusMessage =
		{
			0: "disconnected",
			1: "connected",
			2: "connecting",
			3: "disconnecting",
		}[status] || "unknown";
	console.log(`MongoDB connection status: ${statusMessage}`);
}

module.exports = ConnectMongo;
