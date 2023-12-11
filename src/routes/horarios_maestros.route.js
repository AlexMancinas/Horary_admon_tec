const express = require('express');
const router = express.Router();
const { getHorarios_maestros, getHorarios_maestroById, createHorarios_maestro, updateHorarios_maestro, deleteHorarios_maestro,viewTheachersClassInSameHour,viewHourOfTeachers, testX} = require('../controllers/horarios_maestro.controller');

router.get('/', getHorarios_maestros);
router.get('/:id', getHorarios_maestroById);
router.post('/', createHorarios_maestro);
router.put('/:id', updateHorarios_maestro);
router.delete('/:id', deleteHorarios_maestro);
router.get('/hora/:id', viewTheachersClassInSameHour);
router.get('/empalmes/:idprofe/:hora',viewHourOfTeachers);

module.exports = router;