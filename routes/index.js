const express = require("express");
const router = express.Router();

const db = require("../data/db");

const slugify = require("slugify");
const marked = require("marked");
const domPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const purify = domPurify(new JSDOM().window);

router.get("/", async (req, res) => {
  // const results = await db.query("select * from posts");

  // res.send({ rows: results.rows });
  res.render("index");
});

router.get("/blog/new", async (req, res) => {
  res.render("blog/new", { post: {} });
});

router.get("/blog/edit/:slug", async (req, res) => {
  const post = await db.from("posts").where("slug", req.params.slug).first();
  res.render("blog/new", { post: post });
});

router.get("/blog/:slug", async (req, res) => {
  const post = await db.from("posts").where("slug", req.params.slug).first();
  post.content = post.content ? purify.sanitize(marked(post.content)) : "";
  res.render("blog/show", { post: post });
});

router.get("/blog", async (req, res) => {
  const posts = await db.from("posts").orderBy("created_at", "desc");
  res.render("blog/index", { posts: posts });
});

router.post("/blog", async (req, res) => {
  try {
    let postId = 0;
    const slug = slugify(req.body.title, { lower: true, strict: true });

    if (!req.body.id) {
      postId = await db("posts")
        .insert({
          title: req.body.title,
          content: req.body.content,
          tags: req.body.tags,
          slug: slug,
        })
        .returning("id");
    } else {
      postId = await db("posts")
        .update({
          title: req.body.title,
          content: req.body.content,
          tags: req.body.tags,
          slug: slug,
        })
        .where("id", parseInt(req.body.id))
        .returning("id");
    }

    res.redirect(`/blog/${slug}`);
  } catch (e) {
    console.error(e);
    res.render("blog/new", { post: req.body });
  }
});

module.exports = router;
