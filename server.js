const express = require("express");
const connectDB = require("./utils/connectDB");
require("dotenv").config(); // needed for database
const Tweet = require("./models/Tweet");
const urlencoded = require("express");
const manyTweets = require("./models/manytweets");
const jsxEngine = require("jsx-view-engine");
const methodOverride = require("method-override");

//*  Varables

const app = express();
const PORT = process.env.PORT || 3000;

//* App Config
app.set("view engine", "jsx");
app.engine("jsx", jsxEngine());

//* Middleware
// takes data from url
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static('public'))
//* Routes

// Root
app.get("/", (req, res) => {
  res.redirect('/tweets')
});

//* ============= View Routes

// Index
app.get("/tweets", async (req, res) => {
  try {
    const tweets = await Tweet.find({});
    res.render("Index", { tweets });
  } catch (e) {
    console.log(e);
  }
});

//*Show
//New
app.get("/tweets/new", (req, res) => {
  res.render("New");
});



//Edit

app.get('/tweets/:id/edit', async(req,res)=>{
    
    const {id} = req.params
    // result
    try{
      //find the tweet
      const tweet = await Tweet.findById(id);

      res.render('Edit',{
        tweet
      })
    }catch (error){
        console.log(error)
    }
})








app.get("/tweets/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const tweet = await Tweet.findById(id);
    res.render("Show", { tweet });
  } catch (e) {
    console.log(e);
  }
});

//* ====== API Routes

//  create POST

app.post("/api/tweets", async (req, res) => {
  const createTweet = await Tweet.create(req.body);
  res.redirect("/tweets");
});

//*Update

app.put("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;
    if (req.body.sponsored === "on") {
      req.body.sponsored = true;
    } else {
      req.body.sponsored = false;
    }
  try {
    // const tweetToUpdate = await Tweet.findById(id)
    const updatedTweet = await Tweet.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.redirect(`/tweets/${id}`);
  } catch (e) {
    console.log(e);
  }
});

//*Delete

app.delete("/api/tweets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTweet = await Tweet.findByIdAndRemove(id);
    res.redirect('/tweets')
  } catch (e) {
    console.log(e);
  }
});

//*Add Comment

app.put("/api/tweets/add-comment/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await Tweet.findById(id);
  tweet.comments.push(req.body);
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweet, { new: true });


  res.redirect('/tweets')
});

//*Increase likes

app.get("/api/tweets/add-like/:id", async (req, res) => {
  const { id } = req.params;
  //find the tweet to update
  const tweetToUpdate = await Tweet.findById(id);
  //increase the likes
  tweetToUpdate.likes++;
  const updatedTweet = await Tweet.findByIdAndUpdate(id, tweetToUpdate, {
    new: true,
  });
  res.redirect('/tweets')
});

//* seed Route

app.get("/api/tweets/seed", async (req, res) => {
  const createdTweets = await Tweet.insertMany(manyTweets);
  res.send(createdTweets);
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
