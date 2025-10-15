import { Router } from "express";
const router = Router();

router.get("/games", (req, res) => {
  res.send("Game route is working!");
});
router.get('/games/:id', (req, res) => {
    const {id} = req.params
  res.send("Obteniendo juego" + id);
});
router.post("/games", (req, res) => {
  res.send("create game!");
});
router.put('/games/:id', (req, res) => {
    const {id} = req.params
  res.send("Actualizando game" + id);
});
router.delete("/games/:id", (req, res) => {
  const  {id} =  req.params
  res.send("update!");
});

export default router;