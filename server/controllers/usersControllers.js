const mongoose = require("mongoose");
const Agency = require("../models/agencyModel");
const User = require("../models/usersModel");
const Destination = require("../models/destinationModel");

module.exports.getAgencies = async (req, res, next) => {
  Agency.find({}, (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
};

module.exports.addAgency = async (req, res, next) => {
  if (!req.body.name || !req.body.contact) {
    res.status(400);
    res.send();
  } else {
    try {
      const newAgency = new Agency({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        contact: req.body.contact
      });

      await newAgency.save();

      res.status(201).json(newAgency);
    } catch (err) {
      next(err);
    }
  }
};

module.exports.addUser = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.send();
  } else {
    try {
      const user = await User.findOne({ username: req.body.username }).exec();

      if (user) {
        //check status code
        res.status(409).send();
      } else {
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          username: req.body.username,
          password: req.body.password
        });

        await newUser.save();

        res.status(201).json(newUser);
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports.addToWishList = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).exec();
    if (user) {
      // check location is valid
      if (!req.params.location) {
        res.status(400).send();
      } else {
        let oldWishList = user.wishList;
        oldWishList.push(req.params.location);
        await user.save();
        res.status(200).send();
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
};

module.exports.getAllDestinations = async (req, res, next) => {
  Destination.find({}, (err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
};

module.exports.login = async (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    res.status(400);
    res.send();
  } else {
    try {
      const user = await User.findOne({ username: req.body.username }).exec();

      if (user) {
        if (req.body.password != user.password) {
          res.status(401).send();
        } else {
          res.status(200).json(user);
        }
      } else {
        //check status code
        res.status(401).send();
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports.filterDestinationsByName = async (req, res, next) => {
  if (!req.params.location) {
    res.status(400);
    res.send();
  } else {
    try {
      const location = await Destination.find({
        location: { $regex: req.params.location, $options: "$i" }
      }).exec();
      if (location) {
        res.status(200).json(location);
      } else {
        //check status code
        res.status(401).send();
      }
    } catch (err) {
      next(err);
    }
  }
};

module.exports.filterDestinationsByPrice = async (req, res, next) => {
  console.log(req.params);
  if (!req.params.price1 && !req.params.price2) {
    res.status(400);
    res.send();
  } else {
    try {
      const location = await Destination.find({
        price: {
          $gt: parseInt(req.params.price1),
          $lt: parseInt(req.params.price2)
        }
      }).exec();
      if (location) {
        res.status(200).json(location);
      } else {
        //check status code
        res.status(401).send();
      }
    } catch (err) {
      next(err);
    }
  }
};

// radi kada je u bazi departure i arrival tipa date
module.exports.filterDestinationsByDate = async (req, res, next) => {
  if (!req.params.departure && !req.params.arrival) {
    res.status(400);
    res.send();
  } else {
    try {
      // podaci se zahtevaju u formatu "dd.mm.yyyy."
      split = req.params.departure.split(".");
      departure = [split[1], split[0], split[2]].join("/");
      split1 = req.params.arrival.split(".");
      arrival = [split1[1], split1[0], split1[2]].join("/");
      const location = await Destination.find({
        departure: {
          $gte: new Date(departure)
        },
        arrival: {
          $lte: new Date(arrival)
        }
      }).exec();
      if (location) {
        res.status(200).json(location);
      } else {
        //check status code
        res.status(401).send();
      }
    } catch (err) {
      next(err);
    }
  }
};
/*
module.exports.mainFilter = async (req, res, next) => {
  console.log(req.params);
  if (
    !req.params.price1 &&
    !req.params.price2 &&
    !req.params.location &&
    !req.params.departure &&
    !req.params.arrival
  ) {
    res.status(400);
    res.send();
  } else {
    try {
      if (req.params.departure !== "_") {
        split = req.params.departure.split(".");
        departure = [split[1], split[0], split[2]].join("/");
      }
      if (req.params.arrival !== "_") {
        split1 = req.params.arrival.split(".");
        arrival = [split1[1], split1[0], split1[2]].join("/");
      }
      const location = await Destination.find({
        location: {
          $cond: {
            if: req.params.location !== "_",
            then: { $regex: req.params.location, $options: "$i" },
            // treba .*
            else: { $regex: /./i }
          }
        },
        // postaviti ili obe vrednosti ili obe donje crte
        price: {
          $cond: {
            if: req.params.price1 !== "_" && req.params.price2 !== "_",
            $then: {
              $gt: parseInt(req.params.price1),
              $lt: parseInt(req.params.price2)
            },
            else: {
              $gt: 0,
              $lt: 200000
            }
          }
        },
        departure: {
          $gte: new Date(departure)
        },
        arrival: {
          $lte: new Date(arrival)
        }
        //departure: {
        //  $cond: [
        //    req.params.departure !== "_",
        //    { $gte: new Date(departure) },
        //    { $gte: new Date("01/01/2000") }
        //  ]
        //},
        //arrival: {
        //  $cond: req.params.arrival !== "_",
        //  $then: { $lte: new Date(arrival) },
        //  $else: { $lte: new Date("01/01/2025") }
        //}
      }).exec();
      if (location) {
        res.status(200).json(location);
      } else {
        //check status code
        res.status(401).send();
      }
    } catch (err) {
      next(err);
    }
  }
};
*/

module.exports.deleteLocation = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username }).exec();
    console.log(req.params.username);
    if (user) {
      // check location is valid
      if (!req.params.location) {
        res.status(400).send();
      } else {
        let oldWishList = user.wishList;
        oldWishList.remove(req.params.location);
        await user.save();
        res.status(200).send(user);
      }
    } else {
      res.status(404).send();
    }
  } catch (err) {
    next(err);
  }
};
