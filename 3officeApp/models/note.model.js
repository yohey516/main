import mongoose, {Schema} from "mongoose";

const noteSchema = new Schema({
    noteDescription: {
      type: String,
      required: true,
    },
    uploadDate: {
      type: Date,
      required: true,
    },
    // to track creation of note
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
    },
  });

  export const Note = mongoose.model('Note', noteSchema)