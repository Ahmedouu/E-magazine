const express = require('express');
const app = express();
const path = require('path');

const port = 3200; // Choose a port number

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});