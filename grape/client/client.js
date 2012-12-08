Session.set("location","Buenos Aires");
Session.set("tareas",null);
Session.set("selected",null);
Session.set("page","home");
Session.set('mostrarMensaje',false);

Session.set('chart-uuid', 'medio');
Session.set('chart-categoria', "Reciclado");
Session.set('chart_ma', "medio");
 

function mostrarMensaje(texto,tipo){
  Session.set('mostrarMensaje',true);
  Session.set('mensajeTexto',texto);
  Session.set('mensajeTipo',tipo);
}

Template.info.mostrarMensaje = function(){
  return Session.get('mostrarMensaje');
}

Template.mensaje.tipo = function(){
  return Session.get('mensajeTipo');
}

Template.mensaje.texto = function(){
  return Session.get('mensajeTexto');
}

Template.sidebarDatos.events({
  'click .participar': function(){
    ini = Iniciativas.findOne(Session.get('iniciativa'));
      // deberia mostrar las tareas y elegir una para unirse, pero hace suenho:
      if (Meteor.userId() === null){
       mostrarMensaje('Debes ingresar al sitio para participar :)', 'error');
       return;
     }
     if ( 
       Participantes.find({ iniciativa:ini._id,usuario:Meteor.userId()}).count()>0 ){
       mostrarMensaje('Ya estas participando de esta iniciativa! :)', 'block');
     return;
   }

   var res = Participantes.insert({
    iniciativa:ini._id,
    usuario:Meteor.userId()
  });
 }
});



