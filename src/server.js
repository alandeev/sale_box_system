const app = require('./app');

require('dotenv').config();

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running in the port ${process.env.SERVER_PORT}`)
})