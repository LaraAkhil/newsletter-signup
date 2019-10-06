const express = require("express");
const request = require("request");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const FIRST_NAME = req.body.fName;
  const LAST_NAME = req.body.lName;
  const EMAIL = req.body.email;

  let data = {
    members: [
      {
        email_address: EMAIL,
        status: "subscribed",
        merge_fields: {
          FNAME: FIRST_NAME,
          LNAME: LAST_NAME
        }
      }
    ]
  };

  let jsonData = JSON.stringify(data);

  let options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/f3b4bc0a1f",
    method: "post",
    headers: {
      Authorization: "string 1b7bed89dfdc934f7ffc9a5c30bc5cd0-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });

  console.log(req.body);
});

app.listen(port, () => console.log(`Example app listening on ${port} port!`));
