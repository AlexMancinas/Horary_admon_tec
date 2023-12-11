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
//-- Consulta para verificar que al maestro no le toque darle clases a dos grupos en el mismo horario
const viewTheachersClassInSameHour = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT horarioMaestrosID ,profesor_id,hora FROM horarios_maestros WHERE hora = '${id}' GROUP BY  horarioMaestrosID,profesor_id,hora HAVING COUNT(*) > 0`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

//-- Consultar la hora en las que se empalman los horarios de los maestros --
const viewHourOfTeachers = async (req, res) => {
    try {
        const { idprofe, hora } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT hm.horarioMaestrosID,hm.profesor_id,p.Nombre,hm.hora,M.NombreMateria FROM horarios_maestros hm INNER JOIN Profesores p on p.ProfesorID=hm.profesor_id INNER JOIN Horarios H ON H.ProfesorID=HM.profesor_id INNER JOIN Materias M ON M.MateriaID=H.MateriaID WHERE hora = ${hora} AND profesor_id=${idprofe} GROUP BY hm.horarioMaestrosID,p.Nombre,hm.profesor_id,hm.hora,M.NombreMateria HAVING COUNT (*) >1`);
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
    deleteHorarios_maestro,
    viewTheachersClassInSameHour,
    viewHourOfTeachers,
}