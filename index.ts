// index.ts
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import routes from './routes'; // Import your consolidated routes

const app: Application = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Use the consolidated routes
app.use('/', routes);

// Root route for homepage or other public info
app.get('/', (req, res) => {
    res.send('Welcome to the homepage!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
