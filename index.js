let express = require("express")
let mongoose = require("mongoose")
let path = require("path")
let exphbs = require("express-handlebars")
let todoRoutes = require("./routes/todos")

let PORT = process.env.PORT || 3000

let app = express()
let hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs"
})

app.engine("hbs", hbs.engine)
app.set("view engine", "hbs")
app.set("views", "views")

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect("mongodb+srv://andrei:and123@cluster0.glcrj.mongodb.net/todos",
      {
        useNewUrlParser: true
      }
    )
    app.listen(PORT, () => {
      console.log("Server has been started...")
    })
  } catch (e) {
    console.log(e)
  }
}

start()