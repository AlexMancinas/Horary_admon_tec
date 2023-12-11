const express = require('express');
const router = express.Router();
const { getGroups, getGroupById, createGroup, updateGroup, deleteGroup,viewGroupsInSameHour } = require('../controllers/grupos.controller');

router.get('/', getGroups);
router.get('/:id', getGroupById);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);
// router.get('/materia/:id/:GrupoID/:HoraInicio', viewGroupsInSameHour);
router.get('/materia/:materiaID/:GrupoID/:HoraInicio', viewGroupsInSameHour)

module.exports = router;