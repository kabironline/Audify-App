# Audify - Vue Frontend

Welcome to the Audify! This repository contains the frontend for a music streaming application built with Vue.js. The backend, developed with Flask, is located in a separate repository and handles API requests, database interactions, caching, and email services.

## Project Overview

The Audify allows users to stream music, manage playlists, and discover new tracks. The frontend is built using Vue.js and connects to the Flask backend via API.

## Features

- **User Authentication**: Sign up, log in, and manage user accounts.
- **Music Streaming**: Stream music tracks and explore new releases.
- **Playlists**: Create, edit, and delete playlists.
- **Albums**: Create, edit, and delete albums.
- **Artists**: View artist profiles and discographies.
- **Genres**: Explore music by genre and discover new tracks
- **Search**: Search for tracks, artists, and albums.
- **Admin Panel**: Manage users, tracks, albums, and genres.
- **Email Notifications**: Receive notifications for account activities.
- **Caching**: Improved performance with Redis caching.

## Technologies Used

- **Vue.js**: JavaScript framework for building user interfaces.
- **Vue Router**: For routing and navigation.
- **Pinia**: State management pattern + library.

Backend Repository: [Audify-Server](https://github.com/kabironline/Audify-Server)

## Getting Started

To get started with the frontend of the Audify, follow the instructions below.

### Prerequisites

- Need to run the backend server locally or use the deployed version (need to update the API URL in the frontend).
- Node.js and npm installed on your local machine.

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/kabironline/audify-vue.git
   cd music-streaming-vue
   ```

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Update API URL**

   - Open file http.js located in `src/utils` directory.
   - Update the `baseURL` with the URL of the backend server.
   - Save the changes.

4. **Run the application**
   ```sh
   npm run dev # Compiles and hot-reloads for development
   ```
   or
   ```sh
   npm run build # Compiles and minifies for production
   npm run preview # Preview the production build
   ```

### Note:

This project is a college project for the subject, there mayb be some bugs and issues. Feel free to contribute and make it better.
