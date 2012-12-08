Template.sesumaron.participantes = function(){
  return Participantes.find({iniciativa:Session.get('iniciativa')});
}

Template.iniciativa.soyCreador = function () {
  var creador = Meteor.users.findOne(this.creador);
  return creador._id == Meteor.userId();
};

Template.iniciativa.detail = function () {
  return Iniciativas.findOne(Session.get("iniciativa"));
};

Template.iniciativa.events({
  'click .ver-perfil':function(event){
    Session.set('page','perfil');
    Session.set('perfil',$(event.currentTarget).attr('data-perfil'));
    console.log($(event.currentTarget).attr('data-perfil'));

  }
});

Template.sesumaron.events({
  'click .ver-perfil':function(event){
    Session.set('page','perfil');
    Session.set('perfil',$(event.currentTarget).attr('data-perfil'));
    console.log($(event.currentTarget).attr('data-perfil'));

  }
});