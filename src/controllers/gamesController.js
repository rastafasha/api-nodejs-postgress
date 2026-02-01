const {pool} = require('./../conf/db');

// Get all games

const getGames = async (req, res) => {
  try {
    const consulta = 'SELECT * FROM videojuegos ORDER BY id ASC'; // Reemplaza con tu lógica para obtener los juegos desde la base de datos
    const resultado = await pool.query(consulta);
    res.json({
        exito: true,
        mensaje: 'Juegos obtenidos correctamente',
        datos: resultado.rows,
        total: resultado.rowCount
    });
    
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    res.status(500).json({ error: 'Error al obtener los juegos' });
  }
};

const getGameById = async (req, res) => {
  const { id } = req.params;
  try {
    const consulta = 'SELECT * FROM videojuegos WHERE id = $1'; // Reemplaza con tu lógica para obtener el juego por ID desde la base de datos
    const resultado = await pool.query(consulta, [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Juego no encontrado' });
    }
    res.json({
        exito: true,
        mensaje: 'Juego obtenido correctamente',
        datos: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al obtener el juego:', error);
    res.status(500).json({ error: 'Error al obtener el juego' });
  }
};

const crearJuego = async (req, res) => {
    try {
      const {nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, description } = req.body;

        if (!nombre || !genero || !plataforma  || !precio ) {
            return res.status(400).json({ exito: false, mensaje: 'Faltan campos obligatorios' });
        }

        const consulta = `
        INSERT INTO videojuegos (nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;
        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, description];

        const resultado = await pool.query(consulta, valores);

        res.status(201).json({
            exito: true,
            mensaje: 'Juego creado correctamente',
            datos: resultado.rows[0]
        });
  } catch (error) {
    console.error('Error al crear el juego:', error);
    res.status(500).json({ error: 'Error al crear el juego' });
  }
}

const actualizarJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const {nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, description } = req.body;

        const consulta = `
            UPDATE videojuegos
            SET nombre = $1, genero = $2, plataforma = $3, precio = $4, fecha_lanzamiento = $5, desarrollador = $6, description = $7
            WHERE id = $8 RETURNING *
        `;

        const valores = [nombre, genero, plataforma, precio, fecha_lanzamiento, desarrollador, description, id];

        const resultado = await pool.query(consulta, valores);
        const resultadoActualizacion = await pool.query('SELECT * FROM videojuegos WHERE id = $1', [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }


        res.json({
            exito: true,
            mensaje: 'Juego actualizado correctamente',
            datos: resultadoActualizacion.rows[0]
        });
    } catch (error) {
        console.error('Error al actualizar el juego:', error);
        res.status(500).json({ error: 'Error al actualizar el juego' });
    }
}

const borrarJuego = async (req, res) => {
    const { id } = req.params;
    try {
        const consulta = 'DELETE FROM videojuegos WHERE id = $1 RETURNING *'; // Reemplaza con tu lógica para borrar el juego por ID desde la base de datos
        const resultado = await pool.query(consulta, [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }
        res.json({
            exito: true,
            mensaje: 'Juego borrado correctamente',
            datos: resultado.rows[0]
        });
    } catch (error) {
        console.error('Error al borrar el juego:', error);
        res.status(500).json({ error: 'Error al borrar el juego' });
    }
};      

module.exports = {
  getGames,
  getGameById,
    crearJuego,
    actualizarJuego,
    borrarJuego
};
