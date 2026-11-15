// Chat component for a specific football game
import { useState, useEffect } from "react";
import {
    getGameMessages,
    saveGameMessage
} from "../../Services/ChatModel.js";
import { Link } from "react-router-dom";

import { getCurrentUser } from "../../Services/AuthService.js";

const GameChat = ({ gameId }) => {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const currentUser = getCurrentUser();

    useEffect(() => {
        getGameMessages(gameId, "pregame")
            .then((results) => {
                setMessages(results);
            })
            .catch((error) => {
                console.error("Failed to load messages:", error.message);
                setError("Unable to load comments.");
            });
    }, [gameId]);

    
    const handleSubmit = (event) => {
        event.preventDefault();

        // Prevent submitting an empty comment
        if (!newMessage.trim()) {
            return;
        }

        setError("");

        // Call the service to save the message in Back4App
        saveGameMessage(gameId, newMessage, "pregame")
            .then(() => {
                setNewMessage("");

                // Reload the comments after saving
                return getGameMessages(gameId, "pregame");
            })
            .then((results) => {
                setMessages(results);
            })
            .catch((error) => {
                console.error("Failed to post comment:", error.message);
                setError("Unable to post your comment.");
            });
            console.log("Chat authenticated:", Boolean(currentUser));
    };


    

    
    return (
        <div>
            <h2>Pregame Discussion</h2>
            <p>Discuss the upcoming game with other Notre Dame fans!</p>

            <p>Game ID: {gameId}</p>

            {/* Display an error if the query fails */}
            {error && <p role="alert">{error}</p>}

            {/* Display the retrieved comments */}
            {messages.length === 0 ? (
                <p>No comments yet. Be the first to discuss this game!</p>
            ) : (
                <ul>
                    {messages.map((comment) => {
                        const author = comment.get("author");

                        return (
                            <li key={comment.id}>
                                <strong>
                                    {author?.get("firstName") || "Notre Dame Fan"}
                                </strong>

                                <span>
                                    {" — "}
                                    {comment.createdAt?.toLocaleString()}
                                </span>

                                <p>{comment.get("message")}</p>
                            </li>
                        );
                    })}
                </ul>
            )}

            {currentUser ? (
                <form onSubmit={handleSubmit}>
                    <label htmlFor="chatMessage">Add a comment</label>

                    <input
                        id="chatMessage"
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        placeholder="What do you think about this game?"
                        maxLength={500}
                        required
                    />

                    <button type="submit">
                        Post Comment
                    </button>
                    
                </form>
            ) : (
                <p>
                    Please <Link to="/login">log in</Link> to join the discussion.
                </p>
            )}
        </div>
        
    );
}

export default GameChat;