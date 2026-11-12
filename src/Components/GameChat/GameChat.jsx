// Chat component for a specific football game
import { useState, useEffect } from "react";
import { getGameMessages } from "../../Services/ChatModel.js";

const GameChat = ({ gameId }) => {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");

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
                    {messages.map((comment) => (
                        <li key={comment.id}>
                            {comment.get("message")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default GameChat;