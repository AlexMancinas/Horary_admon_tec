const getConnection = require('../database/connection');

const getSubjects = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Materias');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getSubjectById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Materias WHERE MateriaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createSubject = async (req, res) => {
    try {
        const { nombre, creditosTeoricos, creditosPracticos, carrera, requisitos } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO Materias VALUES ('${nombre}', '${creditosTeoricos}', '${creditosPracticos}', '${carrera}', '${requisitos}')`);
      
        res.status(201).json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, creditosTeoricos, creditosPracticos, carrera, requisitos } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE Materias SET nombre = '${nombre}', creditosTeoricos = '${creditosTeoricos}', creditosPracticos = '${creditosPracticos}', carrera = '${carrera}', requisitos = '${requisitos}' WHERE MateriaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Materias WHERE MateriaID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
};