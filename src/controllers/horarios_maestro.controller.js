const getConnection = require('../database/connection');

const getHorarios_maestros = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Horarios_maestros');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getHorarios_maestroById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Horarios_maestros WHERE HorariomaestrosID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createHorarios_maestro = async (req, res) => {
    try {
        const { profesorID, hora } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO Horarios_maestros VALUES ('${profesorID}', '${hora}')`);
        res.status(201).json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateHorarios_maestro = async (req, res) => {
    try {
        const { id } = req.params;
        const { profesorID, hora } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE Horarios_maestros SET profesor_id = '${profesorID}', hora = '${hora}' WHERE HorariomaestrosID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteHorarios_maestro = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Horarios_maestros WHERE HorariomaestrosID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getHorarios_maestros,
    getHorarios_maestroById,
    createHorarios_maestro,
    updateHorarios_maestro,
    deleteHorarios_maestro
}