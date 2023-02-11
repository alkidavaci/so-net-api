const { connect, connection } = require('mongoose');

// mongodb://127.0.0.1:27017/ is the connection URL, and the /studentsDB at the end is the name of the database.
const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

// Wrap Mongoose around local connection to MongoDB
connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Export connection 
module.exports = connection;
