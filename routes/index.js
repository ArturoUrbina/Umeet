var express = require('express');
var router = express.Router();
const crud = require('../controllers/crud');
var fs = require("fs");

router.get('/', function(req, res, next) {
  req.session.nombre = "";
  res.render('index', {page:'Home', menuId:'home'});
});

router.get('/Registro', function(req, res, next) {
  res.render('Registro', {page:'Home', menuId:'home'});
});

router.get('/Interes', crud.inte);

router.get('/Amigo', crud.fri);

router.get('/Inicio', function(req, res, next) {
  res.render('Inicio', {page:'Home', menuId:'home'});
});

router.get('/Chat', crud.ch);

router.get('/ADMIN', function(req, res, next) {
  res.render('Admin', {page:'Home', menuId:'home'});
});

router.get('/LogOut',(req, res)=>{
  req.session.nombre = "";
  res.render('index', {page:'Home', menuId:'home'});
});

router.post('/save', crud.save);

router.get('/update/:id', crud.edit);

router.get('/friend/:id', crud.addFriend);

router.post('/update/:id', crud.update);

router.get('/delete/:id', crud.delete);

router.post('/Reg/Int', crud.intereses);

router.post('/Reg',function(req,res){
  fs.renameSync(req.files.archivo.path,"public/img/"+req.body.user+".JPG");
  const mysqlCon = require("../controllers/Connection");
  var idus = 0;
  var idagcar = 0;
  var idagtur = 0;
  var idaggen = 0;
  var exists = false;
  mysqlCon.query('SELECT * FROM USUARIO',(err,result)=>{
    if(!err){
      for(var i=0;i<result.length;i++){
          if((result[i].use_us==req.body.user)){
            exists = true;
          }
        }
    }else{
      console.log("No se pudo conectar a la tabla");
    }
  });
  if(!exists){
    mysqlCon.query('INSERT INTO USUARIO(nom_us,con_us,gru_us,bol_us,eda_us,adm_us,fot_us,use_us) VALUES(?,?,?,?,?,false,?,?)', [req.body.name,req.body.pass,req.body.grupo,req.body.boleta,req.body.birthday,"./img/"+req.body.user+".JPG",req.body.user],(err)=>{
    });
    mysqlCon.query('SELECT id_us FROM USUARIO WHERE use_us = ?',[req.body.user], (err,result)=>{
      mysqlCon.query('SELECT id_agCar FROM AGRUPARCARRERA WHERE nom_car = ?',[req.body.Carrera], (err,result1)=>{
        mysqlCon.query('SELECT id_agTur FROM AGRUPARTURNO WHERE nom_tur = ?',[req.body.Turno], (err,result2)=>{
          mysqlCon.query('SELECT id_agGen FROM AGRUPARGENERO WHERE nom_gen = ?',[req.body.Gender], (err,result3)=>{
            mysqlCon.query('INSERT INTO CARRERA(id_us,id_agCar) VALUES(?,?)', [result[0].id_us,result1[0].id_agCar],(err)=>{
            });
            mysqlCon.query('INSERT INTO TURNO(id_us,id_agTur) VALUES(?,?)', [result[0].id_us,result2[0].id_agTur],(err)=>{
            });
            mysqlCon.query('INSERT INTO GENERO(id_us,id_agGen) VALUES(?,?)', [result[0].id_us,result3[0].id_agGen],(err)=>{
              if(!err){
                res.redirect('/Inicio');
              }
              else{
                console.log(err);
                res.redirect('/Registro');
              }
            });
          });
        });
      });
    });
  }else{
    res.redirect('/Registro');
  }
  
});

router.post('/Reg/ADMIN',function(req,res){
  var path= req.files.archivo.path.split("\\");
  fs.renameSync(req.files.archivo.path,"public/img/"+req.body.user+".JPG");
  const mysqlCon = require("../controllers/Connection");
  var adm = false;
  if(req.body.adm == "Si"){
    adm = true;
  }
  mysqlCon.query('INSERT INTO USUARIO(nom_us,con_us,gru_us,bol_us,eda_us,adm_us,fot_us,use_us) VALUES(?,?,?,?,?,?,?,?)', [req.body.name,req.body.pass,req.body.grupo,req.body.boleta,req.body.birthday,adm,"./img/"+req.body.user+".JPG",req.body.user],(err)=>{
    if(!err){
      res.redirect('/AD');
    }
    else{
      console.log(err);
      res.redirect('/AD');
    }
  });
  
});

router.get('/AD', crud.list);

router.get('/Match', crud.Match);

module.exports = router;
