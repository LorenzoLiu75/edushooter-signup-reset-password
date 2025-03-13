const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Serve static files from the public folder
app.use(express.static('./public'));
app.use(express.static('.'));

// Serve signup.html for the root route
app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, 'public', 'edushooterHome.html'));
  res.redirect("/edurobotsHome.html");
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
