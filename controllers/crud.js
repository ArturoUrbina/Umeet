const prueba = {};
const mysqlConnection = require("../controllers/Connection");
var fs = require("fs");

prueba.list = (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, result) => {
     if (err) {
      res.json(err);
     }
     res.render('Admin', {
        data: result,
        user: req.session.nombre
     });
    });
};
prueba.save = (req, res) => {
  var yes=0;
  var mist = "";
  var coincidence = 0;
  var friends = [];
  var l = 0;
  mysqlConnection.query("SELECT * FROM USUARIO",(err,result)=>{
    if(!err){
      for(var i=0;i<result.length;i++){
          if((result[i].nom_us==req.body.user||result[i].use_us==req.body.user)&&result[i].con_us==req.body.pass){
            console.log("Bienvenido");
            yes++;
            coincidence = i;
            req.session.nombre = req.body.user;
            console.log(req.session.nombre);
          }
        }
        if(yes==0){
          mist = "Los Datos Introducidos son Incorrectos";
          res.render('Inicio');
        }
        else{
          if(result[coincidence].adm_us){
            res.render('Admin',{
              data: result,
              user: req.session.nombre
            });
          }else{
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
              if(result6.length>0){
                for(var i = 0;i<result6.length;i++){
                  req.session.i = i;
                  req.session.r = result6.length;
                  mysqlConnection.query('SELECT * FROM USUARIO WHERE ID_US = ?',[result6[i].ida_us],(err22,result22)=>{
                    friends.push(result22[0]);
                    if((friends.length==req.session.r)&&l==0){
                      l++;
                      res.render('User',{
                        data: result6[0],
                        amigos: friends,
                        user: req.session.nombre
                      });
                      i = req.session.r.length;
                    }
                  });
                }
              }
              else{
            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
              console.log(result12[0]);
              if(result12.length>0){
                res.render('User',{
                  data: result12[0],
                  amigos: null,
                  user: req.session.nombre
                });
              }
              else{
                mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
                  console.log("Hola");
                  res.render('User',{
                    data: result[0],
                    amigos: null,
                    user: req.session.nombre
                  });
                });
              }
              
            });
              }
            });
          }
        }
    }else{
      console.log("No se pudo conectar a la tabla");
    }
  });
};
prueba.inte = (req,res)=>{
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      console.log(result12[0].fot_us);
      res.render('User',{
        data: result12[0],
        amigos: null,
        user: req.session.nombre
      });
    }
    else{
      mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
        res.render('User',{
          data: result[0],
          amigos: null,
          user: req.session.nombre
        });
      });
    }
  });
}
prueba.fri = (req,res)=>{
  var friends = [];
  var l = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join amigo where use_us = ?',[req.session.nombre],(err6,result6)=>{
    if(result6.length>0){
      for(var i = 0;i<result6.length;i++){
        req.session.r = result6.length;
        mysqlConnection.query('SELECT * FROM USUARIO NATURAL JOIN AMIGO WHERE ID_US = ?',[result6[i].ida_us],(err22,result22)=>{
          friends.push(result22[0]);
          if((friends.length==req.session.r)&&l==0){
            l++;
            console.log(friends[0].fot_us);
            res.render('User',{
              data: result6[0],
              amigos: friends,
              user: req.session.nombre
            });
            i = req.session.r.length;
          }
        });
      }
    }
    else{
    mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
      if(result12.length>0){
        console.log(result12[0].fot_us);
        res.render('User',{
          data: result12[0],
          amigos: null,
          user: req.session.nombre
        });
      }
      else{
        mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
          res.render('User',{
            data: result[0],
            amigos: null,
            user: req.session.nombre
          });
        });
      }
      
    });
  }
  });
}
prueba.Match = (req,res)=>{
  var posmatch = [];
  var z = 0;
  var ñ = 0;
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos', (err, result)=>{
        req.session.r = result.length;
        for(var i=0; i<result.length;i++){
          mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera where id_us = ?',[result[i].id_us],(err1, result1)=>{
            if(result1.length>0){
              if(result1[0].use_us!=result12[0].use_us){
                mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos natural join genero natural join agrupargenero natural join turno natural join agruparturno natural join carrera natural join agruparcarrera where id_us = ?',[result12[0].id_us],(err13, result13)=>{
                var coin = 0;
                ñ++;
                if(result1[0].nom_pel==result13[0].nom_pel){
                  console.log("Pelicula");
                  coin++;
                }
                if(result1[0].nom_dep==result13[0].nom_dep){
                  console.log("Deporte");
                  coin++;
                }
                if(result1[0].nom_lec==result13[0].nom_lec){
                  console.log("Lectura");
                  coin++;
                }
                if(result1[0].nom_vid==result13[0].nom_vid){
                  console.log("VideoGames");
                  coin++;
                }
                if(result1[0].nom_mus==result13[0].nom_mus){
                  console.log("Music");
                  coin++;
                }
                if((result1[0].nom_gen=="Mujer"&&result13[0].nom_gen=="Hombre")||(result1[0].nom_gen=="Hombre"&&result13[0].nom_gen=="Mujer")){
                  console.log("GenHM");
                  coin+=2;
                }
                else if(result1[0].nom_gen==result13[0].nom_gen){
                  console.log("GenN");
                  coin++;
                }
                if(result1[0].nom_tur==result13[0].nom_tur){
                  console.log("Turno");
                  coin++;
                }
                if(result1[0].nom_car==result13[0].nom_car){
                  console.log("Carrera");
                  coin++;
                }
                if(result1[0].gru_us==result13[0].gru_us){
                  console.log("Grupo");
                  coin+=3;
                }
                var año = result1[0].eda_us.split('/');
                var años = result13[0].eda_us.split('/');
                if(año[2] == años[2]){
                  console.log("Edad");
                  coin+=2;
                }
                else if(año[2] == años[2]-1||año[2]-1 == años[2]){
                  console.log("Edad");
                  coin+=1;
                }
                if(año[2]>años[2]){
                  if(año[2]-años[2]>3){
                    coin-=5;
                  }
                }else if(año[2]<años[2]){
                  if(años[2]-año[2]>3){
                    coin-=5;
                  }
                }
                
                if(coin>=7){
                    coin = ((coin*100)/14)
                    console.log("%"+coin + " " + result1[0].use_us);
                  var mat = {
                    user: result1,
                    coincidence: coin
                  }
                  var l = 0;
                  if(posmatch.length>0){
                    for(var j=0; j<posmatch.length;j++){
                      if(posmatch[j].coincidence<coin){
                        posmatch.splice(j,0,mat);
                        l++;
                        j=posmatch.length;
                      }
                    }
                    if(l==0){
                      posmatch.push(mat);
                    }
                  }
                  else{
                    posmatch.push(mat);
                  }
                }
                console.log(req.session.r + " " + posmatch.length);
                if((ñ == req.session.r-1)&&z==0){
                  z++;
                  res.render('Match',{
                    data: posmatch
                  });
                }
              });
              }
            }
          });
        }
      });
    }
    else{
      console.log("Primero debes llenar tus gustos papuh");
    }
    
  });
}
prueba.addFriend = (req,res)=>{
  const { id } = req.params;
  mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?',[req.session.nombre],(err,result)=>{
    if(err){
      console.log(err);
    }
    mysqlConnection.query('INSERT INTO AMIGO(id_us,ida_us,isf_am,ref_am) values(?,?,false,false)',[result[0].id_us,id],(err1)=>{
      if(err1){
        console.log(err1);
      }
      res.redirect('/Amigo');
    });
  });
    
}
prueba.ch = (req,res)=>{
  mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where use_us = ?',[req.session.nombre],(err12, result12)=>{
    if(result12.length>0){
      console.log(result12[0].fot_us);
      res.render('Chat',{
        data: result12[0],
        user: req.session.nombre
      });
    }
    else{
      mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
        res.render('Chat',{
          data: result[0],
          user: req.session.nombre
        });
      });
    }
    
  });
}
prueba.intereses = (req,res) =>{
  mysqlConnection.query('SELECT * FROM USUARIO WHERE use_us = ?', [req.session.nombre] , (err,result)=>{
      if(err){
        console.log(err);
      }
      mysqlConnection.query('INSERT INTO GUSTOS(id_us,nom_gus) values(?,?)',[result[0].id_us,req.body.Gustos],(err1,result1)=>{
        if(err1){
          console.log(err1);
        }
        mysqlConnection.query('SELECT * FROM AGRUPARDEPORTES WHERE nom_dep = ?',[req.body.Deportes],(err2, result2)=>{
          if(err2){
            console.log(err2);
          }
          mysqlConnection.query('SELECT * FROM AGRUPARPELICULAS WHERE nom_pel = ?',[req.body.Peliculas],(err3, result3)=>{
            if(err3){
              console.log(err3);
            }
            mysqlConnection.query('SELECT * FROM AGRUPARLECTURA WHERE nom_lec = ?',[req.body.Lectura],(err4, result4)=>{
              if(err4){
                console.log(err4);
              }
              mysqlConnection.query('SELECT * FROM AGRUPARVIDEOJUEGOS WHERE nom_vid = ?',[req.body.Video],(err5, result5)=>{
                if(err5){
                  console.log(err5);
                }
                mysqlConnection.query('SELECT * FROM GENEROSMUSICA WHERE nom_mus = ?',[req.body.Musica],(err6, result6)=>{
                  if(err6){
                    console.log(err6);
                  }
                  mysqlConnection.query('INSERT INTO DEPORTES(id_agDep, id_us) VALUES(?,?)',[result2[0].id_agDep,result[0].id_us],(err7, result7)=>{
                    if(err7){
                      console.log(err7);
                    }
                    mysqlConnection.query('INSERT INTO PELICULAS(id_agPel, id_us) VALUES(?,?)',[result3[0].id_agPel,result[0].id_us],(err8, result8)=>{
                      if(err8){
                        console.log(err8);
                      }
                      mysqlConnection.query('INSERT INTO LECTURA(id_agLec, id_us) VALUES(?,?)',[result4[0].id_agLec,result[0].id_us],(err9, result9)=>{
                        if(err9){
                          console.log(err9);
                        }
                        mysqlConnection.query('INSERT INTO VIDEOJUEGOS(id_agVid, id_us) VALUES(?,?)',[result5[0].id_agVid,result[0].id_us],(err10, result10)=>{
                          if(err10){
                            console.log(err10);
                          }
                          mysqlConnection.query('INSERT INTO MUSICA(id_agMus, id_us) VALUES(?,?)',[result6[0].id_agMus,result[0].id_us],(err11, result11)=>{
                            if(err11){
                              console.log(err11);
                            }
    
                            mysqlConnection.query('select * from usuario natural join musica natural join deportes natural join peliculas natural join lectura natural join videojuegos natural join gustos natural join generosmusica natural join agrupardeportes natural join agruparpeliculas natural join agruparlectura natural join agruparvideojuegos where id_us = ?',[result[0].id_us],(err12, result12)=>{
                              if(err12){
                                console.log(err12);
                              }
                              else{
                                res.redirect('/Interes');
                              }
                              
                            });
    
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
  });
}
prueba.update = (req, res) => {
  const { id } = req.params;
  
  req.getConnection((err, conn) => {

  conn.query('UPDATE prueba set nom_us = ?, con_us = ?, gru_us = ?, bol_us = ?, adm_us = ?, fot_us = ?, use_us = ?, eda_us = ? where id_prueba = ?', [newCustomer, id], (err, rows) => {
    res.redirect('/Admin');
  });
  });
};
prueba.edit = (req, res) => {
  const { id } = req.params;
  conexion((err, conn) => {
    conn.query("SELECT * FROM usuario WHERE id_us = ?", [id], (err, result) => {
      res.render('Modificar', {
        data: result
      })
    });
  });
};

prueba.delete = (req, res) => {
  const { id } = req.params;
  console.log(id);
  mysqlConnection.query('SELECT * FROM usuario WHERE id_us = ?', [id], (err, result) => {
      fs.unlinkSync("public/img/"+result[0].use_us+".JPG");
    });
  mysqlConnection.query('DELETE FROM USUARIO WHERE id_us = ?', [id], (err, rows) => {
    res.redirect('/Ad');  
  });
}

module.exports = prueba;
