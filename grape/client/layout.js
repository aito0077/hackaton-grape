/**
 * Layout
 */

Template.layout.home = function(){
  return Session.equals('page','home');
}

Template.layout.iniciativas = function(){
  return Session.equals('page','iniciativas');
}

Template.layout.descripcion_iniciativa = function(){
  return Session.equals('page','descripcion_iniciativa');
}

Template.layout.perfil = function(){
  return Session.equals('page','perfil');
}

Template.layout.nuevaIniciativa = function(){
  return Session.equals('page','nuevaIniciativa');
}

Template.layout.categorias = function(){
  return Session.equals('page','categorias');
}

