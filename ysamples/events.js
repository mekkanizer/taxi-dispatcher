function init () {
    /**
     * Создание мультимаршрута.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
     */
    var multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: ["Москва", "Тверь"]
    }, {
        // Тип промежуточных точек, которые могут быть добавлены при редактировании.
        editorMidPointsType: "via",
        // В режиме добавления новых путевых точек запрещаем ставить точки поверх объектов карты.
        editorDrawOver: false
    });

    // Создаем карту с добавленной на нее кнопкой.
    var myMap = new ymaps.Map('map', {
        center: [56.399625, 36.71120],
        zoom: 7,
        controls: []
    });

    var labels = [
        	document.getElementById('from'),
        	document.getElementById('to')
        ];

    // Добавляем мультимаршрут на карту.
    myMap.geoObjects.add(multiRoute);
    multiRoute.editor.start({
        dragWayPoints: true
    });
    multiRoute.model.events.add('requestsuccess', updateLabels);

    function updateLabels () {
        var points = multiRoute.model.getReferencePoints();
        points.forEach(function (point, i) {
            if (typeof point == 'string') {
                labels[i].value = point;
            } else {
                ymaps.geocode(point instanceof Array ? point : point.getCoordinates()).then(function (res) {
                    labels[i].value = res.geoObjects.get(0).properties.get('text');
                });
            }
        });
    }
}

ymaps.ready(init);
