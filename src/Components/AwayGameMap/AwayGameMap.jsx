import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";

import "./AwayGameMap.css";

const AwayGameMap = ({ games }) => {
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
                            >
                                <title>
                                    {`Notre Dame vs. ${game.get("opponent")}`}
                                </title>
                            </circle>
                        </Marker>
                    );
                })}

            </ComposableMap>
        </div>
    );
};

export default AwayGameMap;