const express = require("express");

const db = require("../data/dbConfig.js");
 
const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .from("accounts")
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      res.status(500).json({ message: "Nope" });
    });
});



router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .first()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Nope" });
    });
});



router.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "there is an error posting" });
    });
});



router.put("/:id", (req, res) => {
  const changes = req.body;

  db("accounts")
    .where("id", "=", req.params.id)
    .update(changes)
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: "Error updating the account"
      });
    });
});



router.delete("/:id", (req, res) => {
  db("accounts")
    .where("id", "=", req.params.id)
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "error removing accounts" });
    });
});

module.exports = router;
