//usado para crear la api rest en nodejs
//console.log("Hola mundo desde NodeJS"), luego se importan paquetes requeridos

const express = require('express');
const mongoose = require('mongoose');
const RegistroSchema = require("./modelos/Registro.js");

const app = express();
//crear rutas
const router = express.Router();
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //usar ese lenguaje


//conexión a la BD en mongodb 
mongoose.connect("mongodb+srv://KellyTM:Dorado123@base-taller1.lecfi.mongodb.net/BDSemana1?retryWrites=true&w=majority");

// operaciones CRUD
router.get('/',(req, res) => {
    res.send("Inicio de la Api para registro");
})

router.get ('/registro', (req, res) => {
    RegistroSchema.find(function(err, datos){
        if(err){
            console.log("Error en la busqueda de datos");
        }else{
            res.send(datos);
        }
    })
});
router.post('/registro',(req, res) => {
    let nuevoRegistro = new RegistroSchema({
        IdRegistro: req.body.IdRegistro,
        TipoDocumento:req.body.TipoDocumento,
        Documento: req.body.Documento,
        Nombres: req.body.Nombres,
        Apellidos: req.body.Apellidos,
        Direccion: req.body.Direccion,
        Email: req.body.Email,
        TelefonoFijo: req.body.TelefonoFijo,
        TelefonoCelular: req.body.TelefonoCelular,
        EnlaceWeb: req.body.EnlaceWeb,
        DescripciónPerfil: req.body.DescripciónPerfil
    });
    nuevoRegistro.save(function (err, datos) {
        if(err){
            console.log(err);
        }
        res.send("Registro de datos realizado")
    })
});


//inicializado web 
app.use(router);
app.listen(3000, () => {
    console.log("Prueba de servidor en el puerto 3000")
});
