import Parse from "parse";

// retrieve all locations from the database
export const getAllLocations = (id) => {
  const Location = Parse.Object.extend("Location");
  const query = new Parse.Query(Location);
  return query.get(id).then((result) => {
    return result;
  });
};
