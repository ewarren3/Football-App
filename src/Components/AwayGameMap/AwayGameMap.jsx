import {
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";

import "./AwayGameMap.css";

const AwayGameMap = () => {
    return (
        <div className="away-game-map">
            <h2>Notre Dame Away Game Locations</h2>

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
            </ComposableMap>
        </div>
    );
};

export default AwayGameMap;