"use strict";
/* eslint-disable */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStreamToken = void 0;
const functions = __importStar(require("firebase-functions"));
const stream_chat_1 = require("stream-chat");
// Securely store API keys in Firebase environment variables
const STREAM_CHAT_API_KEY = functions.config().stream.api_key;
const STREAM_CHAT_SECRET = functions.config().stream.secret;
exports.generateStreamToken = functions.https.onRequest(async (req, res) => {
    try {
        // Validate userId from query params
        const userId = req.query.userId;
        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return;
        }
        // Initialize Stream Chat Server Client
        const serverClient = stream_chat_1.StreamChat.getInstance(STREAM_CHAT_API_KEY, STREAM_CHAT_SECRET);
        // Generate token for the user
        const token = serverClient.createToken(userId);
        res.status(200).json({ token });
    }
    catch (error) {
        console.error("❌ Error generating Stream Chat token:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
});
//# sourceMappingURL=index.js.map