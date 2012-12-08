    //Charts
    Template.tab_body.created = function() {
        var tipo_indicador =  Session.get('tipo_indicador');
        if(typeof tipo_indicador == 'undefined') {
            Session.set('chart-uuid', 'charts_div');
            Session.set('chart-categoria', "Reciclado");
            setear_ambiente_categoria();
            tipo_indicador =  Session.get('tipo_indicador');
        }
    }

    Template.tab_body.descripcion_indicador = function() {
        var tipo_indicador =  Session.get('tipo_indicador');
        return tipo_indicador.categoria;
    }

    function setear_ambiente_categoria() {
        var tipo_indicador = find_indicador_por_tipo(Session.get('chart-categoria'));
        Session.set('tipo_indicador', tipo_indicador);
        Session.set('current_categoria', tipo_indicador.categoria);

        var filteredList = Iniciativas.find({categoria:Session.get('current_categoria')},  {latitude: { $exists: true}});
        Session.set('map_list', filteredList.fetch());
    }

    Template.tabs.events({
      'click #ma': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-categoria', "Reciclado");

        setear_ambiente_categoria();

        Session.set('current-uuid',uuid);
       },
      'click #ed': function(){
        var uuid = Meteor.uuid();

        Session.set('chart-categoria', "Ayuda Escolar");

        setear_ambiente_categoria();

        Session.set('current-uuid',uuid);

        Session.set('chart_ed', 'educacion');
       },
      'click #de': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-categoria', "Capacitacion");

        setear_ambiente_categoria();

        Session.set('current-uuid',uuid);
        Session.set('chart_de', 'desarrollo');
       },

      'click #ac': function(){
        var uuid = Meteor.uuid();
        Session.set('chart-categoria', "Economia Solidaria");

        setear_ambiente_categoria();

        Session.set('current-uuid',uuid);
        Session.set('chart_ac', 'arte');
       }

     });

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
        switch(Session.get('current_categoria')) {
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
    }

    function mouseout_iniciativa_chart(evento) {
        console.log('out');
    }


    function mouseover_iniciativa_chart(evento) {
        console.log('over');
    }


