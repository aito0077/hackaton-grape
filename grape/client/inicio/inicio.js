Template.inicio.UltimosPorCategoria = function(categoria, limite){
  var ret = Iniciativas.find({categoria:categoria},{sort:{fecha_creacion:-1}});
  var items = ret.fetch().slice(0,3);
  return Template.ultimasIniciativas({listado:items,count:ret.count()});
}

Template.heroUnit.events({
  'click .nuevaIniciativa':function(event){
    Session.set('page','nuevaIniciativa');
  }
});
