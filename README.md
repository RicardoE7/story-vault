# Story Vault

**Keep your stories. Build your worlds.**

## Description

Story Vault is a private worldbuilding workspace designed to help writers organize their stories and the fictional worlds behind them. Users can create and manage stories, then organize related characters, locations, events, factions, and important items in one place.

The application includes account registration and login, story and worldbuilding element management, image uploads through Cloudinary, and a responsive interface built around an editorial-inspired design.

## Getting Started

### Dependencies

The following software and services are needed to run the project locally:

- Node.js and npm
- MongoDB database
- Cloudinary account for image uploads
- A modern web browser

The project uses React, Vite, Tailwind CSS, Express, Mongoose, bcrypt, JSON Web Tokens, Multer, and Cloudinary.

### Installing

1. Clone the repository:

   ```bash
   git clone https://github.com/RicardoE7/story-vault.git
   cd story-vault
   ```

2. Install the backend dependencies:

   ```bash
   cd server
   npm install
   ```

3. Create a `.env` file inside the `server/` directory with the following variables:

   ```env
   PORT=3001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_long_random_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Replace the example values with your own credentials. Keep secret values private and do not commit your `.env` file.

4. Open a second terminal at the project root and install the frontend dependencies:

   ```bash
   cd client
   npm install
   ```

5. If your backend runs at a different URL, create a `.env` file inside `client/` and set:

   ```env
   VITE_API_URL=http://localhost:3001
   ```

   The frontend defaults to `http://localhost:3001` when this variable is not set.

### Executing program

**1. Start the backend**

From the `server/` directory:

```bash
npm run dev
```

The API uses port `3001` by default, or the port specified by the `PORT` environment variable.

To verify the API is running, visit `http://localhost:3001/`. The root endpoint returns a JSON message confirming that the Story Vault API is running.

**2. Start the frontend**

From the `client/` directory, in a separate terminal:

```bash
npm run dev
```

Open the local development URL printed by Vite.

**3. Create an account and use Story Vault**

- Register an account and sign in.
- Create and manage stories in the Story Library.
- Open a story workspace to manage its worldbuilding elements.
- Add details and images to stories and elements as needed.

**4. Create a production build**

From the `client/` directory:

```bash
npm run build
```

The production assets are generated in `client/dist/`.

### Available Commands

**Frontend (`client/`):**

| Command           | Purpose                           |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite development server |
| `npm run build`   | Build the frontend for production |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

**Backend (`server/`):**

| Command       | Purpose                       |
| ------------- | ----------------------------- |
| `npm run dev` | Start the server with Nodemon |
| `npm start`   | Start the server with Node.js |

## Help

### Common issues

**The backend cannot connect to MongoDB**

- Verify that `MONGO_URI` is set correctly in `server/.env`.
- Confirm that the database is reachable and that the connection credentials are valid.
- If using a hosted MongoDB service, check its network-access settings.

**The frontend cannot reach the API**

- Confirm that the backend is running.
- Check `VITE_API_URL` in `client/.env`, if configured.
- Restart the Vite development server after changing environment variables.

**Image uploads fail**

- Verify the Cloudinary environment variables in `server/.env`.
- Confirm that the uploaded file is no larger than 5 MB.

**Authentication fails**

- Verify that the backend's `JWT_SECRET` is configured.
- Confirm that the login credentials are correct.

If an issue persists, inspect the terminal output from the frontend and backend for relevant error messages. Do not share environment files or secret credentials when troubleshooting.

## Authors

Project author: Ricardo Edwards.

## Version History

- Initial MVP development
  - User authentication and protected routes
  - Story creation, editing, and deletion
  - Worldbuilding element management
  - Cloudinary image uploads
  - Responsive interface and authentication screens
  - Password complexity validation

## License

No license information has been specified in this repository documentation. Add the appropriate license details if and when a license is selected.

## Acknowledgments

Story Vault uses the following open-source libraries and services:

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Tabler Icons](https://tabler.io/icons)
- [Motion](https://motion.dev/)
