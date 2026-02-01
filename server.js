const express = require("express");
const cors = require("cors");
const { probarConexion, pool } = require("./src/conf/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Function to start the server
const iniciarServidor = async () => {
  try {
    await probarConexion();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("No se pudo iniciar el servidor", error);
  }
};
iniciarServidor();

// landing routes
app.get("/", (req, res) => {
  res.send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Api Video Juegos</title>
    <style>
        body {
            margin: 0;
            background-color: #000;
            color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            font-family: Arial, sans-serif;
            text-align: center;
        }
        h1 {
            color: #007BFF;
        }
        p {
            font-size: 1.2em;
        }
    </style>
</head>
<body>
    <div>
        <h1>Api de Video Juegos funcionando</h1>
        <p>Servidor Activo</p>
    </div>
</body>
</html>`);
});

// Routes
app.get("/api/games", './routes/games.routes.js');
