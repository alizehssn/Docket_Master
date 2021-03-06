const db = require("../../models");

// Requiring path to so we can use relative routes to our HTML files
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");
const { ppid } = require("process");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/docketmaster");
    }
    // Comment out pre-handlebars res.sendFile function
    // res.sendFile(path.join(__dirname, "../public/signup.html"));

    // Insert route to handlebars instead of /public/signup.html
    res.render("signup.handlebars");
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/docketmaster");
    }
    // Comment out pre-handlebars res.sendFile function
    // res.sendFile(path.join(__dirname, "../public/login.html"));

    // Insert route to handlebars instead of /public/login.html
    res.render("login.handlebars");
  });

  // Here we've add our isAuthenticated middleware to this route. // NEEDS TO BE ADDED BACK IN
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // Note that we are using async / await to populate data (divisions and cases) on the main docket master page
  app.get("/docketmaster", isAuthenticated, async (req, res) => {
    const divisions = await db.Division.findAll({});
    const cases = await db.Case.findAll({
      include: [
        db.Type,
        db.Division,
        db.Plaintiff,
        db.PlaintiffAttorney,
        db.Defendant,
        db.DefenseAttorney,
      ],
    });
    res.render("docketmaster", {
      divisions,
      cases,
    });
  });

  //route for rendering the docketmaster add page with the create case form
  app.get("/docketmaster/add", async (req, res) => {
    const cases = await db.Case.findAll({
      include: [
        db.Type,
        db.Division,
        db.Plaintiff,
        db.PlaintiffAttorney,
        db.Defendant,
        db.DefenseAttorney,
      ],
    });
    res.render("create-case.handlebars", { cases });
  });

  //route for rendering the docketmaster view all cases page
  app.get("/docketmaster/view", async (req, res) => {
    const cases = await db.Case.findAll({
      include: [
        db.Type,
        db.Division,
        db.Plaintiff,
        db.PlaintiffAttorney,
        db.Defendant,
        db.DefenseAttorney,
      ],
    });

    res.render("view.handlebars", { cases });
  });

  //??? duplicate route for rendering an add new case page ???
  app.get("/docketmaster/add", async (req, res) => {
    const cases = await db.Case.findAll({
      include: [
        db.Type,
        db.Division,
        db.Plaintiff,
        db.PlaintiffAttorney,
        db.Defendant,
        db.DefenseAttorney,
      ],
    });
    res.render("add.handlebars", { cases });
  });

  //route for rendering the docketmaster admin create page
  app.get("/docketmaster/admin/create", (req, res) => {
    res.render("adminCreate.handlebars");
  });

  //route for rendering the docketmaster admin view page
  app.get("/docketmaster/admin/view", async (req, res) => {
    const plaintiffs = await db.Plaintiff.findAll({});
    const defendants = await db.Defendant.findAll({});
    const pAttys = await db.PlaintiffAttorney.findAll({});
    const dAttys = await db.DefenseAttorney.findAll({});
    const divisions = await db.Division.findAll({});
    const types = await db.Type.findAll({});
    res.render("adminView.handlebars", {
      plaintiffs,
      defendants,
      pAttys,
      dAttys,
      divisions,
      types,
    });
  });

  //route for rendering the docketmaster about page
  app.get("/docketmaster/about", (req, res) => {
    res.render("aboutDocketMaster.handlebars");
  });

  //route for rendering the docketmaster contact page
  app.get("/docketmaster/contact", (req, res) => {
    res.render("contactPage.handlebars");
  });

  //wildcard route for catch-all rendering
  // app.get("*", async (req, res) => {
  //   const divisions = await db.Division.findAll({});
  //   const cases = await db.Case.findAll({
  //     include: [
  //       db.Type,
  //       db.Division,
  //       db.Plaintiff,
  //       db.PlaintiffAttorney,
  //       db.Defendant,
  //       db.DefenseAttorney,
  //     ],
  //   });
  //   res.render("docketmaster", {
  //     divisions,
  //     cases,
  //   });
  // });
};
