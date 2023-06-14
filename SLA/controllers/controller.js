const router = require("express").Router();
const passport = require('passport');
const User = require('../models/model');
const { upload, multerStorageCloudinary } = require("../config/multer.config");
const secureRoute = require("../config/securepage.config");

// Display the index page
router.get("/", (req, res) => {
  res.render("index");
});

// Display the signup form
router.get("/signup", (req, res) => {
  res.render("signup");
});

// Handle user signup
router.post("/signup", async (req, res) => {
  console.log(req.body)
  try {
    const user = new User({ ...req.body });
    await user.save();
    res.redirect("/login");
  } catch (e) {
    console.log(e)
    res.redirect("/signup")
  }
});

// Display the login form
router.get("/login", (req, res) => {
  res.render("login");
});

// Handle user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

// Display the login form
router.get("/home", secureRoute, (req, res) => {
  console.log(req.user)
  res.render("home", {
    user: req.user
  });
});

router.get("/create", (req, res) => {
  res.render("create");
});

// Create a new item
router.post("/create", [secureRoute,multerStorageCloudinary.single('image')], async (req, res) => {
  try {
    console.log(req.file)
    if(!req.file.path){
      throw new Error("Unable to upload image to cloudinary")
    }
    const { name, quantity } = req.body;
    const newItem = { name, quantity, image : req.file.path };
    // User.findById(req.user._id).then((user) => {
    //   const { name, quantity } = req.body;
    //   const newItem = { name, quantity, image : req.file.path };
    //   user.items.push(newItem);
    //   return user.save()
    // })

    await User.findByIdAndUpdate(req.user._id, { $push:{
        items: newItem
      }})
   res.redirect("/home");
  } catch (e) {
    console.log(e);
  }
});

// Delete an item
router.delete("/delete/:index", (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  try {
    User.findById(req.user._id).then((user) => {
      const index = req.params.index;
      if (index >= 0 && index < user.items.length) {
        user.items.splice(index, 1);
        return user.save();
      }
    });
    res.redirect("/home");
  } catch (e) {
    console.log(e);
  }
});

// Show what user want to edit
router.get("/edit/:id", (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  User.findById(req.user._id)
    .then((user) => {
      const itemId = req.params.id;
      const item = user.items.id(itemId);
      if (item) {
        res.render("edit", { item });
      } else {
        res.redirect("/home");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/home");
    });
});

// Update an item
router.put("/items/:id", upload.single('image'), (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  User.findById(req.user._id)
    .then((user) => {
      const itemId = req.params.id;
      const item = user.items.id(itemId);
      if (item) {
        item.name = req.body.name;
        item.quantity = req.body.quantity;
        if (req.file) {
          item.image = req.file.filename;
        }
        return user.save();
      } else {
        res.redirect("/home");
      }
    })
    .then(() => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/home");
    });
});

// For Logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return res.redirect("/login");
    }
    res.redirect("/login");
  });
});

module.exports = router;
