const functions = require("firebase-functions");
const { StreamChat } = require("stream-chat");

const STREAM_CHAT_API_KEY = functions.config().stream.api_key;
const STREAM_CHAT_SECRET = functions.config().stream.secret;

exports.generateStreamToken = functions.https.onRequest(async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: "User ID is required" });
      return;
    }

    const serverClient = StreamChat.getInstance(STREAM_CHAT_API_KEY, STREAM_CHAT_SECRET);
    const token = serverClient.createToken(userId);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
