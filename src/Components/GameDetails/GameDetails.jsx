import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllGames } from "../../Services/GameModel.js";
import GameChat from "../GameChat/GameChat.jsx";

function GameDetails() {
    const navigate = useNavigate();
    const { gameId } = useParams();

    const [game, setGame] = useState(null);
    const [location, setLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllGames()
            .then(async (games) => {
                const selectedGame = games.find(
                    (g) => String(g.id) === gameId
                );
                setGame(selectedGame || null);

                // Load the full Location object (stadium, city, state)
                const loc = selectedGame?.get("location");
                console.log("location pointer:", loc);
                if (loc) {
                    await loc.fetch();
                    console.log("location attributes:", loc.attributes);
                    setLocation(loc);
                }

                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Failed to load game details:", error);
                setError("Unable to load game details.");
                setIsLoading(false);
            });
    }, [gameId]);


    useEffect(() => {
        // Check for changes to the game's chat phase
        const checkGamePhase = () => {
            getAllGames()
                .then((games) => {
                    const updatedGame = games.find(
                        (g) => String(g.id) === gameId
                    );

                    if (updatedGame) {
                        setGame(updatedGame);
                    }
                })
                .catch((error) => {
                    console.error("Failed to check game phase:", error.message);
                });
        };

        // Check every five seconds
        const intervalId = setInterval(checkGamePhase, 5000);

        // Stop checking when leaving the game details page
        return () => {
            clearInterval(intervalId);
        };
    }, [gameId]);


    if (isLoading) {
        return <p>Loading game details...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!game) {
        return <p>Game not found.</p>;
    }

    return (
        <div>
            <h1>Game Details</h1>

            <h2>Notre Dame vs. {game.get("opponent")}</h2>

            <p>Date: {game.get("date")?.toLocaleDateString()}</p>
            <p>Location: {location?.get("stadium")}</p>
            <p>City: {location?.get("city")}, {location?.get("state")}</p>

            <button onClick={() => navigate("/")}>
                Back to Schedule
            </button>

            <GameChat
                key={`${gameId}-${game.get("chatPhase") || "pregame"}`}
                gameId={gameId}
                phase={game.get("chatPhase") || "pregame"}
            />
        </div>
    );
}

export default GameDetails;
