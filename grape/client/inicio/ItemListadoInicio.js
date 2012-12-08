Template.ItemListadoInicio.events({
  'click .ver-perfil':function(event){
    Session.set('page','perfil');
    Session.set('perfil',$(event.currentTarget).attr('data-perfil'));
    console.log($(event.currentTarget).attr('data-perfil'));
  }
});
