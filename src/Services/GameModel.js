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



// export const getAllGames = async () => {
//   const Game = Parse.Object.extend("Game");
//   const query = new Parse.Query(Game);
//   query.include("location");

//   try {
//     const result = await query.find();
//     console.log("Loaded games:", result);
//     return result;
//   } catch (error) {
//     console.error("Error loading games:", error);
//     return [];
//   }
// };