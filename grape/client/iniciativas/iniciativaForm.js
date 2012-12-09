/**
 * Formulario Iniciativa
 */
Template.iniciativaForm.location = function(){
  return Session.get("location");
};

Template.iniciativaForm.events({
  'click .agregarTarea' : function(){
    tareas.push({
      nombre:$('#tareaNombre').val(),
      categoria:$('#tareaCategoria').val(),
      estado:0
    });

    Session.set("tareas",tareas);
    if (typeof console !== 'undefined'){
      console.log(tareas);
    }
  },
  'click .guardarIniciativa':function(){
    if (Meteor.userId() === null){
      mostrarMensaje('Debes ingresar al sitio para participar :)', 'error');
      return;
    }
    var latlon = Session.get('latLng');
    console.log(latlon);
    var Iniciativa = {
      titulo:$('#iniTitulo').val(),
      descripcion:$('#iniDescripcion').val(),
      categoria:$('#iniCategoria').val(),
      tipo:$('#iniTipo').val(),
      titulo:$('#iniTitulo').val(),
      tareas:Session.get('tareas')
    };

    if( typeof latlon !== "undefined" ){
      Iniciativa.latitud = latlon.$a;
      Iniciativa.longitud = latlon.ab;
    }
    var res = Meteor.call('crearIniciativa',Iniciativa,function(error,iniciativa){
      console.log(error);
    });

    Session.set('latLng',undefined);
    latlon = undefined ;
    Session.set('tareas',[]); 
    tareas = undefined;
  }
});

var tareas = [];
Template.tareasForm.tareas = function(){
  return Session.get("tareas");
};
