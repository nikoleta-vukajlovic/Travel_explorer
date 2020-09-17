const express = require("express");
const router = express.Router();

const controller = require("../../controllers/usersControllers");

// http://localhost:3000/api/usersRoutes

// izlistava sve agencije iz baze
router.get("/agencies", controller.getAgencies);

// dodaje novu agenciju
router.post("/addAgency", controller.addAgency);

//registracija novog korisnika
router.post("/addUser", controller.addUser);

// izlistavanje svih korisnika
router.get("/getUsers", controller.getUsers);

// dodavanje destinacije u listu zelja korisniku
router.put("/:username/:location", controller.addToWishList);

// izlistavanje svih destinacija iz baze
router.get("/destinations", controller.getAllDestinations);

// logovanje postojeceg korisnika
router.post("/login", controller.login);

router.get("/filterByLocation/:location", controller.filterDestinationsByName);

router.get(
  "/filterByPrice/:price1/:price2",
  controller.filterDestinationsByPrice
);

router.get(
  "/filterByDate/:departure/:arrival",
  controller.filterDestinationsByDate
);

router.delete("/delete/:username/:location", controller.deleteLocation);

//router.get(
//  "/filter/:location/:departure/:arrival/:price1/:price2",
//  controller.mainFilter
//);

module.exports = router;
