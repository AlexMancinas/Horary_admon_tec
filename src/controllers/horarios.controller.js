const getConnection = require('../database/connection');

const getAllSchedules = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM Horarios');
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const getScheduleById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Horarios WHERE HorarioID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}
const createSchedule = async (req, res) => {
    try {
      const { diaSemana, horaInicio, horaFin, duracion, lugar, semestre, carrera, profesorID, materiaID, grupoID } = req.body;
      const pool = await getConnection();
      const result = await pool.request().query(`
        INSERT INTO Horarios
        VALUES (
          '${diaSemana}',
          CONVERT(INT, '${horaInicio}'),
          CONVERT(INT, '${horaFin}'),
          CONVERT(INT, '${duracion}'),
          '${lugar}',
          ${semestre},
          '${carrera}',
          ${profesorID},
          ${materiaID},
          ${grupoID}
        )
      `);
      res.status(201).json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
}

const updateSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const { diaSemana, horaInicio, horaFin, duracion, lugar, semestre, carrera, profesorID, materiaID, grupoID } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`
            UPDATE Horarios
            SET diaSemana = '${diaSemana}',
            horaInicio = CONVERT(INT, '${horaInicio}'),
            horaFin = CONVERT(INT, '${horaFin}'),
            duracion = CONVERT(INT, '${duracion}'),
            lugar = '${lugar}',
            semestre = ${semestre},
            carrera = '${carrera}',
            profesorID = ${profesorID},
            materiaID = ${materiaID},
            grupoID = ${grupoID}
            WHERE HorarioID = ${id}
        `);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

const deleteSchedule = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`DELETE FROM Horarios WHERE HorarioID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule
}