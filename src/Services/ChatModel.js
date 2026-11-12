
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
