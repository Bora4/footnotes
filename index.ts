// index.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import path from 'path'; // Needed to work with directory paths
import routes from './routes'; // Import your consolidated routes

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Use the consolidated routes
app.use('/', routes);

// If you want a specific route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
