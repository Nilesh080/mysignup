const functions = require("firebase-functions");
const express = require("express");
const https = require("https");
const engine = require("consolidate");

const app = express();
app.engine("hbs", engine.handlebars);
app.set("views", "./views");
app.set("view engine", "hbs");

const appTitle = "News Letter";
const databaseUrl = "https://us13.api.mailchimp.com/3.0/lists/7dae4f9704";

app.get("/", (req, res) => {
  // eslint-disable-next-line object-curly-spacing
  res.render("index", { appTitle });
});

app.post("/register", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const fullName = firstName + " " + lastName;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const requestBody = JSON.stringify(data);

  const options = {
    method: "POST",
    auth: "b53c58025f0bdac56cb53ea1e488f696-us13",
  };

  const request = https.request(databaseUrl, options, (response) => {
    console.log(response.statusCode);
    if (response.statusCode == 200) {
      // eslint-disable-next-line object-curly-spacing
      res.render("success", { appTitle, firstName, lastName, email });
    }
    // eslint-disable-next-line object-curly-spacing
    res.render("failure", { appTitle, fullName, email, options });
  });

  request.write(requestBody);
  request.end();
});

exports.app = functions.https.onRequest(app);
