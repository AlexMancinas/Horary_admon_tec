const getConnection = require('../database/connection');

const getGroups = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Grupos');
        res.json(result.recordset);
        console.log(result.recordset);
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getGroupById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Grupos WHERE GrupoID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createGroup = async (req, res) => {
    try {
        const { nombre,carrera,semestre} = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO Grupos VALUES ('${nombre}','${carrera}','${semestre}')`);
        res.status(201).json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre,carrera,semestre } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE Grupos SET nombre = '${nombre}', carrera='${carrera}', semestre='${semestre}' WHERE GrupoID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Grupos WHERE GrupoID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup
}