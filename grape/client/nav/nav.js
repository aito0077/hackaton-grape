Template.nav.events({
  'click #nav-home':function(){
    Session.set('page','home');
  },
  'click .nav-iniciativas':function(event){
    Session.set('filtro',$(event.currentTarget).attr('data-filter'));
    Session.set('titulo-principal',$(event.currentTarget).attr('rel'));
    Session.set('imagen-principal',$(event.currentTarget).attr('data-image'));
    Session.set('page','iniciativas');
  },
  'click #nav-descripcion_iniciativa':function(event){
    Session.set('page','descripcion_iniciativa');
  },
  'click #nav-perfil':function(event){
    Session.set('page','perfil');
  },
  'click .logout':function(event){
    Meteor.logout();
  }
});

Template.nav.userId = function(){
  return Meteor.userId();
}

Template.nav.events({
  'click .ver-perfil':function(event){
    Session.set('page','nuevaIniciativa');
  },
  'click .ver-perfil':function(event){
    Session.set('page','perfil');
    Session.set('perfil',$(event.currentTarget).attr('data-perfil'));
    console.log($(event.currentTarget).attr('data-perfil'));
  }
});

