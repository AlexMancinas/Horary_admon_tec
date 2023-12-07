const getConnection = require('../database/connection');

const getAllUsers = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM usuarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM usuarios WHERE usuarioID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const { nombre, apellido, email, password, rol} = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`INSERT INTO usuarios VALUES ('${nombre}', '${apellido}', '${email}', '${password}', '${rol}')`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, password, rol} = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`UPDATE usuarios SET nombre = '${nombre}', apellido = '${apellido}', correo_electronico = '${email}', contrasena = '${password}', rol = '${rol}' WHERE usuarioID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM usuarios WHERE usuarioID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}