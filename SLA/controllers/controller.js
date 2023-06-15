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
  const errorMessage = {message: ""}
  if(req.query.error == 1){
    errorMessage.message="something went wrong"
  }

  if(req.query.error == 2){
    errorMessage.message="user not found"
  }

  res.render("login", errorMessage);
});

// Handle user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureMessage: true,
    successMessage: "Successfully logged in"
  })
);

// Handle user login
// router.post("/login",(req, res, next) => {
//   passport.authenticate("local", function(err, user, info){
//     if(err) {
//       return res.redirect("/login?error=1")
//     }

//     if(!user) {
//       return res.redirect("/login?error=2")
//     }
//     console.log({err, user, info})
//     return res.redirect("/home")
//   })(req, res, next)
// });

// Display the login form
router.get("/home", secureRoute, (req, res) => {
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
    if(!req.file.path){
      throw new Error("Unable to upload image to cloudinary")
    }
    const { name, quantity } = req.body;
    const newItem = { name, quantity, image : req.file.path };
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
    .catch((e) => {
      console.log(e);
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
    .catch((e) => {
      console.log(e);
      res.redirect("/home");
    });
});

// Display the login form
router.get("/check", secureRoute, (req, res) => {
  const errorMessage = {message: ''}

  if(req.query.error == 1){
    errorMessage.message = "Bad request..."
  }

  if(req.query.error == 2){
    errorMessage.message = "User not found, please enter a valid username"
  }

  res.render("check", errorMessage);
});

// Handle user addition
router.post("/check", secureRoute, async (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
     return res.redirect("/check?error=1") //1 means no user in body
    } 
    
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.redirect("/check?error=2") //2 means user not found
    } 
    
    return res.render("searchresult", { user: existingUser});
  } catch (e) {
    console.log(e);
  }
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
