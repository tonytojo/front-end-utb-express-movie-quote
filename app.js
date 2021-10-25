const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const movieRoutes = require('./routes/movies'); 
const morgan = require('morgan');
app.use(express.json());


morgan("dev");
app.use('/movies/search', movieRoutes);
app.use(express.static('public'));

app.listen(PORT,() => {
   console.log(`Lets get some famous quotes from movie ${PORT}`);
});
