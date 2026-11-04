# Changelog

All notable changes to the Notre Dame Football Schedule application are documented here.

## 0.3.0

## [Feature 5] — Authentication and Protected Routes

### Added
- Created an `Auth` landing component with Register and Login buttons that navigate to the corresponding routes.
- Created `AuthRegister` to collect first name, last name, email, and password and register new users through Parse.
- Created `AuthLogin` to authenticate existing users.
- Created a reusable `AuthForm` component shared by the registration and login pages.
- Created `AuthService.js` to handle Parse user creation, login, and current-user lookup.
- Added a `ProtectedRoute` component that restricts the football schedule and game details pages to signed-in users.
- Added a `GuestRoute` component that redirects signed-in users away from the landing, login, and register pages to the football schedule.
- Added routes for `/login` and `/register` in `Components.jsx`.
- Added error messages that display to the user when registration fails.

### Changed
- Moved registration logic (form state, submit handler, and redirect) out of `Auth` and into `AuthRegister`, so `Auth` now handles navigation only.
- Wrapped the `/main` and `/games/:gameId` routes in `ProtectedRoute`.
- Updated `Home`, `MainList`, `GameDetails`, and `GameModel.js` to work with the authentication flow.

## 0.0.1

### Added
- Integrated the Back4App Parse database to retrieve Notre Dame football schedule information.
- Created `GameModel.js` to query football games from Parse.
- Created `LocationModel.js` to query stadium and location information.
- Established a pointer relationship between the `Game` and `Location` database classes.
- Added asynchronous database loading using React Hooks and Promises.

### Changed
- Updated the schedule to retrieve football games from the Parse backend instead of the local JSON file.
- Updated the game display to format dates returned by Parse.
- Configured Vite to support the Parse SDK and browser-compatible dependencies.

### Fixed
- Resolved Vite and Parse module import compatibility errors.
- Corrected Back4App class-level permissions to allow retrieval of referenced Location records.
- Fixed the opponent attribute mapping between Parse records and React components.

## [Feature 4] — Component Architecture and Backend Integration

### Added
- Created a component tree diagram documenting the application's React architecture.
- Implemented routing between the main football schedule and individual game details.
- Used React Router to navigate between modules.
- Created Game and Location database models.

### Changed
- Used Vite as the professor-approved build system instead of Webpack.
- Integrated asynchronous database queries with React components.

## [Feature 3] — Football Schedule Application

### Added
- Created the initial Notre Dame football schedule application.
- Added a JSON dataset containing 12 football games.
- Implemented an Axios service to load schedule data asynchronously.
- Created reusable React components for displaying the schedule.
- Added opponent search functionality.
- Added Home/Away filtering.
- Added chronological sorting.
- Added Details buttons using parent-to-child props and event callbacks.
