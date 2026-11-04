// This component renders a list of games and allows the user to select a game to view its details. It takes in two props: `games`, which is an array of game objects, and `onSelectGame`, which is a function that handles the selection of a game.
const GameList = ({ games, onSelectGame }) => {
  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          {game.get("opponent")} — {game.get("date")?.toLocaleDateString()} ({game.get("siteType")})

          <button onClick={() => onSelectGame(game)}>
            Details
          </button>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
