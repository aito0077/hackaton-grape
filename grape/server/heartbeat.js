Meteor.setInterval(function () {
    var now = (new Date()).getTime();
    Connections.find({last_seen: {$lt: (now - 60 * 1000)}}).forEach(function (user) {
        console.log('Desconectar...');        // do something here for each idle user
    });
});

