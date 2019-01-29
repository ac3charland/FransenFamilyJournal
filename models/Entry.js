var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new LibrarySchema object
// This is similar to a Sequelize model
var EntrySchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    // `author` must be of type String
    author: String,
    // `title` must be of type String
    title: String,

    body: String,

    image: { data: Buffer, contentType: String }
});

// This creates our model from the above schema, using mongoose's model method
var Entry = mongoose.model("Entry", EntrySchema);

// Export the Book model
module.exports = Entry;