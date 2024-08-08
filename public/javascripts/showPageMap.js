mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/standard', // style URL
        center: campground.geometry.coordinates, // starting position [lng, lat]
        zoom: 10, // starting zoom
    });

    const marker1 = new mapboxgl.Marker()
        .setLngLat(campground.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ closeButton: false, maxWidth: '200px', offset: 25 }).setHTML(`<h3>${campground.title}</h3><h5>${campground.location}</h5>`))
        .addTo(map);

    map.addControl(new mapboxgl.NavigationControl());
        