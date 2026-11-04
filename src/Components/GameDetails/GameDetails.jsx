import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllGames } from "../../Services/GameModel.js";

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

            <button onClick={() => navigate("/Main")}>
                Back to Schedule
            </button>
        </div>
    );
}

export default GameDetails;
