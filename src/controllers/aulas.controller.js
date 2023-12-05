const getConnection = require('../database/connection');

const getClasses = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Aulas');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getClassById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Aulas WHERE AulaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createClass = async (req, res) => {
    try {
        const { nombre, capacidad } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO Aulas VALUES ('${nombre}', '${capacidad}')`);
        res.status(201).json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}


const updateClass = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, capacidad } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE Aulas SET nombre = '${nombre}', capacidad = '${capacidad}' WHERE AulaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteClass = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Aulas WHERE AulaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getClasses,
    getClassById,
    createClass,
    updateClass,
    deleteClass
}