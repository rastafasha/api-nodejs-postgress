import { Router } from "express";
const router = Router();

const {
  getGames,
  getGameById,
  crearJuego,
  actualizarJuego,
  borrarJuego,
} = require("./src/controllers/gamesController");


router.get('/games', [
], getGames);

router.get('/games/:id', [
], getGameById);
router.get('/games/store', [
], crearJuego);
router.get('/games/update/:id', [
], actualizarJuego);
router.get('/games/delete/:id', [
], borrarJuego);

// router.get("/games", (req, res) => {
//   res.send("Game route is working!");
// });
// router.get('/games/:id', (req, res) => {
//     const {id} = req.params
//   res.send("Obteniendo juego" + id);
// });
// router.post("/games/store", (req, res) => {
//   res.send("create game!");
// });
// router.put('/games/:id', (req, res) => {
//     const {id} = req.params
//   res.send("Actualizando game" + id);
// });
// router.delete("/games/:id", (req, res) => {
//   const  {id} =  req.params
//   res.send("update!");
// });

export default router;