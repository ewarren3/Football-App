// Chat component for a specific football game
import { useState, useEffect, useRef } from "react";
import {
    getGameMessages,
    saveGameMessage
} from "../../Services/ChatModel.js";
import { Link } from "react-router-dom";
import "./GameChat.css";

import { getCurrentUser } from "../../Services/AuthService.js";

const GameChat = ({ gameId, phase = "pregame" }) => {

    const [messages, setMessages] = useState([]);
    const [error, setError] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const currentUser = getCurrentUser();
    const chatContainerRef = useRef(null);
    const [showGuidelines, setShowGuidelines] = useState(false);
    const [acceptedGuidelines, setAcceptedGuidelines] = useState(
        () => getCurrentUser()?.get("acceptedChatGuidelines") === true
    );

    
    useEffect(() => {
        let active = true;

        const loadMessages = () => {
            getGameMessages(gameId, phase)
                .then((results) => {
                    if (active) {
                        setMessages(results);
                        setError("");
                    }
                })
                .catch((error) => {
                    if (active) {
                        console.error("Failed to load messages:", error.message);
                        setError("Unable to load comments.");
                    }
                });
        };

        // Clear messages from the previous game or phase
        setMessages([]);
        setError("");

        // Load immediately
        loadMessages();

        // Check for new comments every 5 seconds
        const intervalId = setInterval(loadMessages, 5000);

        // Stop polling when the component unmounts or changes games/phases
        return () => {
            active = false;
            clearInterval(intervalId);
        };
    }, [gameId, phase]);


        useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (!acceptedGuidelines) {
            setShowGuidelines(true);
            return;
        }

        // Prevent submitting an empty comment
        if (!newMessage.trim()) {
            return;
        }

        setError("");

        // Call the service to save the message in Back4App
        saveGameMessage(gameId, newMessage, phase)
            .then(() => {
                setNewMessage("");

                // Reload the comments after saving
                return getGameMessages(gameId, phase);
            })
            .then((results) => {
                setMessages(results);
            })
            .catch((error) => {
                console.error("Failed to post comment:", error.message);
                setError("Unable to post your comment.");
            });
    };

    const handleCommentFocus = () => {
        if (!acceptedGuidelines) {
            setShowGuidelines(true);
        }
    };

    const handleAcceptGuidelines = () => {
        const user = getCurrentUser();

        if (!user) {
            setError("You must be logged in to accept the guidelines.");
            return;
        }

        user.set("acceptedChatGuidelines", true);

        user.save()
            .then(() => {
                setAcceptedGuidelines(true);
                setShowGuidelines(false);
            })
            .catch((error) => {
                console.error("Failed to save guidelines:", error.message);
                setError("Unable to save your agreement. Please try again.");
            });
    };


        


    

    
    return (
        <div className="game-chat">
            <h2>
                {phase === "live"
                    ? "The game has started! Chat live with other Notre Dame fans."
                    : "Discuss the upcoming game with other Notre Dame fans!"}
            </h2>

            {/* Display an error if the query fails */}
            {error && <p role="alert">{error}</p>}

            
            {/* Scrollable discussion history */}
            <div className="chat-messages" ref={chatContainerRef}>
                {messages.length === 0 ? (
                    <p>No comments yet. Be the first to discuss this game!</p>
                ) : (
                    messages.map((comment) => {
                        const author = comment.get("author");

                        return (
                            <div className="chat-comment" key={comment.id}>
                                <div className="chat-avatar">
                                    {author?.get("firstName")?.charAt(0) || "F"}
                                </div>

                                <div className="chat-comment-content">
                                    <div className="chat-comment-header">
                                        <strong>
                                            {author?.get("firstName") || "Notre Dame Fan"}
                                        </strong>

                                        <span className="chat-timestamp">
                                            {comment.createdAt?.toLocaleString()}
                                        </span>
                                    </div>

                                    <p>{comment.get("message")}</p>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>


        {showGuidelines && (
            <div className="guidelines-overlay">
                <div
                    className="guidelines-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="guidelines-title"
                >
                    <h2 id="guidelines-title">
                        Before You Join the Conversation ☘️
                    </h2>

                    <p>
                        Keep the conversation positive and respectful.
                        Friendly rivalries are welcome, but harassment,
                        personal attacks, and offensive language are not.
                    </p>

                    <p>
                        This message board may be monitored to help
                        keep the community welcoming for everyone.
                    </p>

                    <button
                        type="button"
                        onClick={handleAcceptGuidelines}
                    >
                        I Agree — Let's Chat!
                    </button>
                </div>
            </div>
        )}


            {currentUser ? (
                <form className="chat-form" onSubmit={handleSubmit}>
                    <label htmlFor="chatMessage">Add a comment</label>

                    <input
                        className="chat-input"
                        id="chatMessage"
                        type="text"
                        value={newMessage}
                        onChange={(event) => setNewMessage(event.target.value)}
                        onFocus={handleCommentFocus}
                        placeholder="What do you think about this game?"
                        maxLength={500}
                        required
                    />


                    <button className="chat-submit" type="submit">
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