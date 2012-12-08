/**
 * Listado de Iniciativas
 */

Template.ListadoIniciativas.count = function(){
  return Iniciativas.find({categoria:Session.get("filtro")}).count();
}

Template.ListadoIniciativas.listado = function(){
  return Iniciativas.find({categoria:Session.get("filtro")});
}

Template.ListadoIniciativas.tituloPrincipal = function(){
  return Session.get('titulo-principal');
}

Template.ListadoIniciativas.imagenPrincipal = function(){
  return Session.get('imagen-principal');
}

Template.ItemListadoInicio.events({
    'click .iniciativa': function(event){
        Session.set('page','descripcion_iniciativa');
        Session.set('iniciativa',$(event.currentTarget).attr('data-id'));
    }
});

Template.ListadoIniciativas.events({
  'click .iniciativa': function(event){
    Session.set('page','descripcion_iniciativa');
    Session.set('iniciativa',$(event.currentTarget).attr('data-id'));
  }
})
