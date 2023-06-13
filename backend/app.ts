import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  updatePost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  // Sleep delay goes here
  res.json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postDetails = posts.find(post => post.id === id);
  const creatorEmail = !!postDetails 
    ? findUserById(postDetails.userId).email 
    : null;
  res.json({...postDetails, creatorEmail: creatorEmail});
});

app.post("/api/posts/:id", (req, res) => {
  updatePost(req.body);
  res.status(200).json({ success: true });
})


/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  try {
    const incomingPost = req.body;
    const { id } = jwt.verify(incomingPost.token, 'secret') as IDecodedUser; //jwt.verify solves problem 1
    delete incomingPost['token'];
    addPost({...incomingPost, userId: id, id: Date.now()}); // addPost will validate incoming post; solves problem 2
    res.status(200).json({ success: true });
  }
  catch (err) {
    res.status(401).json({ err });
  }
});

app.listen(port, () => console.log("Server is running"));
