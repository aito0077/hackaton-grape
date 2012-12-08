    //Charts
    Template.tabs.show_chart = function(categoria){
            var uuid = Meteor.uuid();
        Session.set('chart-uuid', uuid);
        Session.set('chart-categoria', categoria);
        var template = Template.charts({uuid:uuid});
        return template;
    }

    Template.tabs.chart_ma = function(){
      return Session.equals('chart_ma','medio');
    }
    Template.tabs.chart_ed  = function(){
      return Session.equals('chart_ed','educacion');
    }
    Template.tabs.chart_ac  = function(){
      return Session.equals('chart_ac','arte');
    }
    Template.tabs.chart_de  = function(){
      return Session.equals('chart_de','desarrollo');
    }

    Template.tabs.events({
      'click #ma': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-uuid', 'medio');
        Session.set('chart-categoria', "Reciclado");
        Session.set('chart_ma', "medio");
       },
      'click #ed': function(){
        console.log('click en edicacion');
        var uuid = Meteor.uuid();
        Session.set('chart-uuid', 'educacion');
        Session.set('chart-categoria', "Ayuda Escolar");
        Session.set('chart_ed', 'educacion');

       },
      'click #de': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-uuid', 'desarrollo');
        Session.set('chart-categoria', "Capacitacion");
        Session.set('chart_de', 'desarrollo');
       },

      'click #ac': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-uuid', 'arte');
        Session.set('chart-categoria', "Economia Solidaria");
        Session.set('chart_ac', 'arte');

       }

     });

    Template.charts_ac.rendered = function(){
        console.log('renderizando grafico');
        if (Meteor.is_client) {

            console.log('chart-categoria');
            Meteor.call('find_pais_indicador', [], Session.get('chart-categoria'), function(err,response) {
                if(err) {
                    Session.set('serverDataResponse', "Error:" + err.reason);
                    return;
                }
                
                Session.set('current_categoria', response.current_categoria);
                Session.set('tipo_indicador', response.tipo_indicador);
                Session.set('series', response.series);
                Session.set('iniciativas', response.iniciativas);
                try {
                    render_chart();
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }



    Template.charts_de.rendered = function(){
        console.log('renderizando grafico');
        if (Meteor.is_client) {

            console.log('chart-categoria');
            Meteor.call('find_pais_indicador', [], Session.get('chart-categoria'), function(err,response) {
                if(err) {
                    Session.set('serverDataResponse', "Error:" + err.reason);
                    return;
                }
                
                Session.set('current_categoria', response.current_categoria);
                Session.set('tipo_indicador', response.tipo_indicador);
                Session.set('series', response.series);
                Session.set('iniciativas', response.iniciativas);
                try {
                    render_chart();
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }



    Template.charts_ed.rendered = function(){
        console.log('renderizando grafico');
        if (Meteor.is_client) {

            console.log('chart-categoria');
            Meteor.call('find_pais_indicador', [], Session.get('chart-categoria'), function(err,response) {
                if(err) {
                    Session.set('serverDataResponse', "Error:" + err.reason);
                    return;
                }
                
                Session.set('current_categoria', response.current_categoria);
                Session.set('tipo_indicador', response.tipo_indicador);
                Session.set('series', response.series);
                Session.set('iniciativas', response.iniciativas);
                try {
                    render_chart();
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }


    Template.charts_ma.rendered = function(){
        console.log('renderizando grafico');
        if (Meteor.is_client) {

            console.log('chart-categoria');
            Meteor.call('find_pais_indicador', [], Session.get('chart-categoria'), function(err,response) {
                if(err) {
                    Session.set('serverDataResponse', "Error:" + err.reason);
                    return;
                }
                
                Session.set('current_categoria', response.current_categoria);
                Session.set('tipo_indicador', response.tipo_indicador);
                Session.set('series', response.series);
                Session.set('iniciativas', response.iniciativas);
                try {
                    render_chart();
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }


    Template.charts.rendered = function(){
        console.log('renderizando grafico');
        if (Meteor.is_client) {

            console.log('chart-categoria');
            Meteor.call('find_pais_indicador', [], Session.get('chart-categoria'), function(err,response) {
                if(err) {
                    Session.set('serverDataResponse', "Error:" + err.reason);
                    return;
                }
                
                Session.set('current_categoria', response.current_categoria);
                Session.set('tipo_indicador', response.tipo_indicador);
                Session.set('series', response.series);
                Session.set('iniciativas', response.iniciativas);
                try {
                    render_chart();
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }

    function render_chart() {
        console.log('render chart');
        var series = Session.get('series');
        var iniciativas = Session.get('iniciativas');
        var tipo_indicador = Session.get('tipo_indicador');
        var div_tag = Session.get('element_tag');
        var options = {
            indicator_description: tipo_indicador.descripcion,
            categoria: tipo_indicador.categoria,
            element_tag: Session.get('chart-uuid'),
            x_title: '',
            y_title: '',
        };

        agregar_iniciativas(series, iniciativas);
        render_line_chart(series, options);

    }


    function render_line_chart(data, options) {
        var self = this;
        console.log('div: '+options.element_tag);
        var element = $('#'+options.element_tag);
        console.dir(element);

         var grafico = new Highcharts.StockChart({
            chart: {
                type: 'spline',
                renderTo: options.element_tag,
                zoomType: 'x',
                spacingRight: 20
            },
            legend: {
                enabled: true,
                align: '',
                backgroundColor: '#FFFFFF',
                borderColor: 'white',
                borderWidth: 0,
                layout: 'horizontal',
                verticalAlign: 'bottom',
                shadow: true
            },
            rangeSelector: {
                enabled: false
            },
            title: {
                text: options.indicator_description || ''
            },

            subtitle: {
                text: options.categoria || ''
            },
            xAxis: {
                type: 'datetime',
                maxZoom: 14 * 24 * 3600000, // fourteen days
                maxPadding: 0.10,
                title: {
                    text: options.x_title
                }
            },
            yAxis: {
                title: {
                    text: options.y_title
                },
                gridLineColor: '#FFFFFF',
                min: 0,
                maxPadding: 0.10,
                startOnTick: false,
                showFirstLabel: false
            },

            series: data,
            navigation: {
                buttonOptions: {
                    enabled: false
                }
            },
            tooltip: {
                formatter: function(){
                    return this.text
                }                
            }

        });
    }

    function agregar_iniciativas(series, iniciativas) {
        var icon_image = 'medioAmbienteSmall.png';
        switch(this.Session.get('current_categoria')) {
            case "Medio Ambiente":
                icon_image = 'medioAmbienteSmall.png';
                break; 
            case "Educacion":
                icon_image = 'educacionSmall.png';
                break; 
            case "Desarrollo":
                icon_image = 'desarrolloSocialSmall.png';
                break; 
            case "Arte y Cultura":
                icon_image = 'arteCulturaSmall.png';
                break; 
            default: 
                icon_image = 'medioAmbienteSmall.png';
                break; 
        }
        var shape = 'url(/images/'+icon_image+')';
 
        _.each(iniciativas, function(iniciativa) {
            var year = new Date(iniciativa.fecha_creacion).getFullYear();
            var rango_year = Date.UTC(year, 0, 1);
            var y_value = 0;
            var serie_a_agregar = [];
            _.each(series, function(serie) {
               if(serie.id == iniciativa.pais) {
                    serie_a_agregar = serie;
                    _.each(serie.data, function(datum) {
                        if(datum['x'] == rango_year) {
                            y_value =  datum['y'];
                        }
                    });
                    var marca = {
                        x: iniciativa.fecha_creacion,
                        y: y_value,
                        marker: {
                            enabled: true,
                            symbol: shape
                        }
                    };
                    serie_a_agregar.data.push(marca);
               } 
            });
        });
        _.each(series, function(serie) {
            serie.data = _.sortBy(serie.data, function(dato) {
                return dato['x'];
            });
        });


    }

    function click_iniciativa_chart(evento) {
        console.log('click');
        console.dir(evento);
    }

    function mouseout_iniciativa_chart(evento) {
        console.log('out');
        console.dir(evento);
    }


    function mouseover_iniciativa_chart(evento) {
        console.log('over');
        console.dir(evento);
    }


