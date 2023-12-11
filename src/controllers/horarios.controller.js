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
      const { diaSemana, horaInicio, horaFin, duracion,aula, semestre, carrera, profesorID, materiaID, grupoID } = req.body;
      const pool = await getConnection();
      const result = await pool.request().query(`
        INSERT INTO Horarios
        VALUES (
          '${diaSemana}',
          CONVERT(INT, '${horaInicio}'),
          CONVERT(INT, '${horaFin}'),
          CONVERT(INT, '${duracion}'),
          '${aula}',
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
        const { diaSemana, horaInicio, horaFin, duracion, aula, semestre, carrera, profesorID, materiaID, grupoID } = req.body;
        const pool = await getConnection();
        const result = await pool.request().query(`
            UPDATE Horarios
            SET diaSemana = '${diaSemana}',
            horaInicio = CONVERT(INT, '${horaInicio}'),
            horaFin = CONVERT(INT, '${horaFin}'),
            duracion = CONVERT(INT, '${duracion}'),
            aula = '${aula}',
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

//--Consulta pAra ver el horario de un solo maestro-- 
const viewtheachersschedule = async(req,res)=>{
        try {
        console.log(req.params);
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request().query(`SELECT * FROM Horarios WHERE ProfesorID = ${id}`);
        res.json(result.recordset);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}

//--Consulta para filtrar horaio por carrera y grupo--
const viewGroupAndRaceInHorario = async(req,res)=>{
    try {
    console.log(req.params);
    const { semestre, carrera, grupo } = req.params;
    const pool = await getConnection();
    const result = await pool.request().query(`SELECT * FROM Horarios WHERE Semestre=${semestre} AND Carrera='${carrera}' AND GrupoID=${grupo}
    `);
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
    deleteSchedule,
    viewtheachersschedule,
    viewGroupAndRaceInHorario,
}

