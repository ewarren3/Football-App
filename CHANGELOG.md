# Changelog

All notable changes to the Notre Dame Football Schedule application are documented here.

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