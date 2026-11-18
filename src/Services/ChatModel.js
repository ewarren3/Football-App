
import Parse from "parse";

// Get chat messages for one game and one discussion phase.
export const getGameMessages = (gameId, phase = "pregame") => {
    const ChatMessage = Parse.Object.extend("ChatMessage");
    const Game = Parse.Object.extend("Game");

    // selected Game record
    const gamePointer = Game.createWithoutData(gameId);

    const query = new Parse.Query(ChatMessage);

    // Only retrieve messages belonging to this game 
    query.equalTo("game", gamePointer);

    // Keep pregame and live conversations separate 
    query.equalTo("phase", phase);

    // Load the user information associated with each message
    query.include("author");

    // Display oldest comments first.
    query.ascending("createdAt");

    return query.find();
};


// Create a new chat message for a selected game
export const saveGameMessage = (gameId, message, phase = "pregame") => {
    const currentUser = Parse.User.current();

    // Only authenticated users can post comments
    if (!currentUser) {
        return Promise.reject(
            new Error("You must be logged in to comment.")
        );
    }

    // Prevent empty messages
    if (!message.trim()) {
        return Promise.reject(
            new Error("Comment cannot be empty.")
        );
    }

    const ChatMessage = Parse.Object.extend("ChatMessage");
    const Game = Parse.Object.extend("Game");

    const gamePointer = Game.createWithoutData(gameId);
    const newMessage = new ChatMessage();

    newMessage.set("game", gamePointer);
    newMessage.set("author", currentUser);
    newMessage.set("message", message.trim());
    newMessage.set("phase", phase);

    return newMessage.save();
};

