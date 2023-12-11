const express = require('express');
const router = express.Router();
const { getAllSchedules, getScheduleById, createSchedule,updateSchedule, deleteSchedule,viewtheachersschedule   ,viewGroupAndRaceInHorario} = require('../controllers/horarios.controller');

router.get('/', getAllSchedules);
router.get('/:id', getScheduleById);
router.post('/', createSchedule);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);
router.get('/ProfeId/:id',viewtheachersschedule);
router.get('/filtrar/:semestre/:carrera/:grupo',viewGroupAndRaceInHorario);


module.exports = router;