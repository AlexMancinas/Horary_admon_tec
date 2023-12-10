const express = require('express');
const router = express.Router();
const { getHorarios_maestros, getHorarios_maestroById, createHorarios_maestro, updateHorarios_maestro, deleteHorarios_maestro,viewTheachersClassInSameHour} = require('../controllers/horarios_maestro.controller');

router.get('/', getHorarios_maestros);
router.get('/:id', getHorarios_maestroById);
router.post('/', createHorarios_maestro);
router.put('/:id', updateHorarios_maestro);
router.delete('/:id', deleteHorarios_maestro);
router.get('/hora/:hora', viewTheachersClassInSameHour)

module.exports = router;