
// const GameList = ({ games, onSelectGame }) => {
//   return (
//     <ul>
//       {games.map((game) => (
//         <li key={game.id}>
//           {/* Add button for user interaction */}
//           {game.opponent} — {game.date} ({game.location})

//           <button onClick={() => onSelectGame(game)}>
//             Details
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default GameList;

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
