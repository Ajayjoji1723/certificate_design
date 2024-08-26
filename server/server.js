const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 4444;
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("DB Connected"))
.catch((error) => console.log(error));


app.use('/api', require('./routes/apiRoutes'));


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
