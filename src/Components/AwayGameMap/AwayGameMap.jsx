import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

import "./AwayGameMap.css";

const AwayGameMap = ({ games }) => {
    const [selectedGame, setSelectedGame] = useState(null);
    const [popupPosition, setPopupPosition] = useState({
            x: 0,
            y: 0
        });
    const navigate = useNavigate();

    // Filter the games to only include away games with valid location data
    const mapGames = games.filter(
        (game) => game.get("siteType") === "Away" ||
        game.get("siteType") === "Neutral"
    );

    // Only include games that have valid latitude and longitude values
    const gamesWithLocations = mapGames.filter((game) => {
        const location = game.get("location");

        return (
            location &&
            typeof location.get("latitude") === "number" &&
            typeof location.get("longitude") === "number"
        );
    });


    return (
        <div className="away-game-map">
            <h2>Notre Dame Away & Neutral Games Locations</h2>
            
            <div className="map-legend">
                <span>
                    <span className="legend-dot away"></span>
                    Away Games
                </span>

                <span>
                    <span className="legend-dot neutral"></span>
                    Neutral-Site Games
                </span>
            </div>
            <div className="map-container">
            <ComposableMap
                    projection="geoAlbersUsa"
                    projectionConfig={{ scale: 900 }}
                >
                    <Geographies geography="https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json">
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    fill="#E8EDF2"
                                    stroke="#FFFFFF"
                                    strokeWidth={0.5}
                                />
                            ))
                        }
                    </Geographies>

                {/* Display a marker for each away game */}
                {gamesWithLocations.map((game) => {
                    const location = game.get("location");

                    const latitude = location.get("latitude");
                    const longitude = location.get("longitude");

                    const siteType = game.get("siteType");

                    const markerColor = siteType === "Neutral" ? "#0C2340" : "#C99700";

                    return (
                        <Marker
                            key={game.id}
                            coordinates={[longitude, latitude]}
                        >
                            <circle
                                r={6}
                                fill={markerColor}
                                stroke="#FFFFFF"
                                strokeWidth={1.5}
                                onClick={(event) => {
                                    const map = event.currentTarget.ownerSVGElement;
                                    const mapRect = map.getBoundingClientRect();
                                    const markerRect = event.currentTarget.getBoundingClientRect();

                                    const x = (
                                        (markerRect.left + markerRect.width / 2 - mapRect.left)
                                        / mapRect.width
                                    ) * 100;

                                    const y = (
                                        (markerRect.top + markerRect.height / 2 - mapRect.top)
                                        / mapRect.height
                                    ) * 100;

                                    setPopupPosition({ x, y });
                                    setSelectedGame(game);
                                }}
                                style={{ cursor: "pointer" }}
                            >
                                <title>
                                    {`Notre Dame vs. ${game.get("opponent")}`}
                                </title>
                            </circle>
                        </Marker>
                    );
                
                })}
            </ComposableMap>

            {/* Floating stadium information card */}
            {selectedGame && (
                <div
                    className="stadium-card"
                    style={{
                        "--marker-x": `${popupPosition.x}%`,
                        "--marker-y": `${popupPosition.y}%`
                    }}
                >
                    <h3>
                        Notre Dame vs. {selectedGame.get("opponent")}
                    </h3>

                    <p>
                        <strong>Stadium:</strong>{" "}
                        {selectedGame.get("location").get("stadium")}
                    </p>

                    <p>
                        <strong>Location:</strong>{" "}
                        {selectedGame.get("location").get("city")},{" "}
                        {selectedGame.get("location").get("state")}
                    </p>

                    <p>
                        <strong>Game Type:</strong>{" "}
                        {selectedGame.get("siteType")}
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(`/games/${selectedGame.id}`)}
                    >
                        View Game Details
                    </button>

                    <button
                        type="button"
                        onClick={() => setSelectedGame(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div> {/* Closes map-container */}
    </div>     {/* Closes away-game-map */}
    );
};

export default AwayGameMap;
