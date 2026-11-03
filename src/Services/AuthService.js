import Parse from "parse";

// Register a new user in Back4App
export const createUser = (newUser) => {
    const user = new Parse.User();

    user.set("username", newUser.email);
    user.set("password", newUser.password);
    user.set("email", newUser.email);
    user.set("firstName", newUser.firstName);
    user.set("lastName", newUser.lastName);

    // Returns the Promise to the calling component
    return user.signUp();

}


// Log in an existing user using Parse
export const loginUser = (email, password) => {
    return Parse.User.logIn(email, password);
};

