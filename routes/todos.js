let { Router } = require("express")
let Todo = require("../models/Todo")
let router = Router()

router.get("/", async (req, res) => {
  let todos = await Todo.find({}).lean()

  res.render("index", {
    title: "Todo list",
    isIndex: true,
    todos
  })
})

router.get("/create", (req, res) => {
  res.render("create", {
    title: "Create todo",
    isCreate: true
  })
})

router.post("/create", async (req, res) => {
  let todo = new Todo({
    title: req.body.title
  })

  await todo.save()
  res.redirect("/")
})

router.post("/complete", async (req, res) => {
  let todo = await Todo.findById(req.body.id)

  todo.completed = !!req.body.completed
  await todo.save()

  res.redirect("/")
})

router.post("/delete", async (req, res) => {
  let todo = await Todo.findById(req.body.id)

  await todo.delete()

  res.redirect("/")
})

module.exports = router