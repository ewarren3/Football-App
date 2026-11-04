import Parse from "parse";

// retrieve all games from the database
export const getAllGames = () => {
  const Game = Parse.Object.extend("Game");
  const query = new Parse.Query(Game);

  return query.find().then((result) => {
      console.log("Loaded games:", result);
    return result;
  });
};



