const getConnection = require('../database/connection');

const getTeachers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Profesores');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getTeacherById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Profesores WHERE ProfesorID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createTeacher = async (req, res) => {
    try {
        const { nombre, domicilio, email, telefono, horarioDisponible } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO Profesores VALUES ('${nombre}', '${domicilio}', '${email}', '${telefono}', '${horarioDisponible}')`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const updateTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, domicilio, email, telefono, horarioDisponible } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE Profesores SET nombre = '${nombre}', domicilio = '${domicilio}', correoElectronico = '${email}', telefono = '${telefono}', horarioDisponible = '${horarioDisponible}' WHERE ProfesorID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Profesores WHERE ProfesorID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
}