import mongoose from "mongoose";
import { Router } from "express";
import { responseList } from "../config/response-list.js";
import { Note } from "../models/note.model.js";
import { User } from "../models/user.model.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/all/notes", async (req, res) => {
  try {
    const notes = await Note.find().populate("createdBy");
    res.status(200).json({ notes });
  } catch (err) {
    res.status(400).json({ error: err, message: responseList.BAD_REQUEST });
  }
});

router.get("/all/companynotes/:company", authenticateUser, async (req, res) => {
  try {
    const notes = await User.find({ company: req.params.company });
    res.status(200).json({ notes });
  } catch (err) {
    res.status(400).json({ error: err, message: responseList.BAD_REQUEST });
  }
});

router.get("/notes", authenticateUser, async (req, res) => {
  try {
    console.log(req.user);
    //TODO: only display loggedIn user todo
    // populate will get user created by
    //const notes = await Note.find({ "createdBy.company": req.user.company }).populate("createdBy");
    const notes = await Note.find().populate("createdBy").sort({ uploadDate: -1 }); //1,000,000
    const notesOfCompany = notes.filter((note) => {
      return note.createdBy && note.createdBy.company === req.user.company;
    }); //1,000,000 On

    // agregate method to filter in proper way -using mongoose
    const rNote = await Note.aggregate([
      {
        $lookup: {
          from: "User",
          localField: "createdBy",
          foreignField: "_id",
          as: "notes",
        },
      },
      { $unwind: { path: "$notes" } },
      { $match: { "notes.company": req.user.company } },
    ]);
    console.log("rNote: ", rNote);

    res.status(200).json({ notes: notesOfCompany });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

router.post("/notes", authenticateUser, async (req, res) => {
  try {
    //TODO: add loggedIn user id todo and push todo to user
    console.log(req.user._id);
    const note = new Note({ ...req.body, createdBy: req.user._id, uploadDate: Date.now() });
    await note.save();
    await User.findByIdAndUpdate(req.user._id, { $push: { notes: note._id } });
    res.status(201).json({ message: responseList.CREATED_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.BAD_REQUEST });
  }
});

// to delete
router.delete("/notes/:id", authenticateUser, async (req, res) => {
  if (!req.params.id || !mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: responseList.BAD_REQUEST });
  }
  try {
    await Note.findByIdAndDelete(req.params.id);
    //TODO Remove from User note array
    res.status(200).json({ message: responseList.DELETED_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.DELETED_FAILED });
  }
});

// to edit
router.patch("/notes/:id", async (req, res) => {
  if (!req.params.id || !mongoose.isObjectIdOrHexString(req.params.id)) {
    return res.status(400).json({ message: responseList.BAD_REQUEST });
  }
  try {
    await Note.findByIdAndUpdate(req.params.id, { noteDescription: req.body.description });
    //TODO Remove from User todo array
    res.status(200).json({ message: responseList.UPDATE_SUCCESS });
  } catch (e) {
    res.status(400).json({ message: responseList.DELETED_FAILED });
  }
});

router.get("/test", (req, res) => {
  console.log(req.user);
  res.send("All good");
});

export default router;
