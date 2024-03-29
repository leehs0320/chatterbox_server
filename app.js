var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var sequelize = require("./models").sequelize;
var indexRouter = require("./routes/index");
var roomsRouter = require("./routes/rooms");
var postsRouter = require("./routes/posts");
var usersRouter = require("./routes/users");

var app = express();

// sequelize.sync({ force: true });
sequelize.sync();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./build")));
// app.use(express.static(path.join(__dirname, "./chatterbox_client/build")));

app.use("/", indexRouter);
app.use("/rooms", roomsRouter);
app.use("/posts", postsRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./build/index.html"));
  // res.sendFile(path.join(__dirname, "./chatterbox_client/build/index.html"));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
