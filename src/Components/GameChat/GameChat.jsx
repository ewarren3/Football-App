// Chat component for a specific football game

const GameChat = ({ gameId }) => {

    return (
        <div>
            <h2>Pregame Discussion</h2>
            <p>Discuss the upcoming game with other Notre Dame fans!</p>

            <p>Game ID: {gameId}</p>
        </div>
    );
};

export default GameChat;