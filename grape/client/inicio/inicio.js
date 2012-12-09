Template.categorias.UltimosPorCategoria = function(categoria, limite) {
  console.log('Ultimos por categoria: '+categoria);
  //var categoria = if(Session.get('current_categoria');
  if(typeof categoria == 'undefined') {
      categoria = Session.get('current_categoria');
  }
  var ret = Iniciativas.find({categoria:categoria},{sort:{fecha_creacion:-1}});
  var items = ret.fetch().slice(0,3);
  return Template.ultimasIniciativas({listado:items,count:ret.count()});
}

Template.heroUnit.events({
  'click .nuevaIniciativa':function(event){
    Session.set('page','nuevaIniciativa');
  },

  'click .iniciativas':function(event){
    Session.set('page','categorias');
  }


});
