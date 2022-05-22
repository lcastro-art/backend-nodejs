/*
    Event Routes
    /api/events
*/

const { Router } = require("express");
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, eliminarEvento, actualizarEvento, crearEvento } = require("../controllers/events");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");

// Todas tienen que pasar por la validación del JWT
router.use(validarJWT);
// Obtener eventos
router.get(
    '/',
    getEventos
);


// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validarCampos
    ],
    actualizarEvento);

// Borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;