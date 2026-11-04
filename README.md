# Notre Dame Football Schedule

A React application for viewing the Notre Dame football schedule, built with Vite and a Back4App (Parse) backend.
Katherine Comito and Eleanor Warren

## Features

- Football schedule loaded from a Parse database (Game and Location classes)
- Search by opponent, Home/Away filtering, and chronological sorting
- Game details page for each game
- User registration and login with Parse authentication
- Protected routes: the schedule and game details require login
- Guest-only routes: logged-in users are redirected away from the login and register pages

## Tech Stack

- React with Vite
- React Router
- Parse SDK (Back4App)

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Guests only | Landing page with Register and Login buttons |
| `/login` | Guests only | Login form |
| `/register` | Guests only | Registration form |
| `/main` | Logged-in users | Football schedule |
| `/games/:gameId` | Logged-in users | Game details |

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Add your Back4App credentials (see Configuration below).
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Configuration

Describe where the Parse application ID and JavaScript key are set (for example, a `.env` file or a Parse initialization file). Do not commit real keys to a public repository.

## Project Structure

```
src/
  Components/
    Auth/              Auth, AuthForm, AuthLogin, AuthRegister
    GameDetails/       Game details page
    Main/              Home and MainList (schedule)
    ProtectedRoute/    ProtectedRoute and GuestRoute
  Services/            AuthService, GameModel, LocationModel
```

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for the history of changes.
