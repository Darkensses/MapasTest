var app = {
	inicio: function(){
		this.iniciaFastClick();				
	},

	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},	

	dispositivoListo: function(){
		navigator.geolocation.getCurrentPosition(app.pintarCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);		
	},

	pintarCoordenadasEnMapa: function(position){
		var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

		/*L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZGFya2Vuc3NlcyIsImEiOiJjaXlnanR1NGgwMzhhMnFyd3d2cXdmaDhvIn0.YeqObUXcRQ8K751sMLxAhA', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18
    	}).addTo(miMapa);*/

    	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    	}).addTo(miMapa);

    	app.pintarMarcador([position.coords.latitude, position.coords.longitude], '¡Estoy aquí!', miMapa);    	

    	if(localStorage.getItem("storageName") != "todas"){
    		$.getJSON(localStorage.getItem("storageName"), function(data){
    		L.geoJson(data, {
    			style: app.myStyle("#ff0000")
    		}).addTo(miMapa);})
    	}
    	else{
    		$.getJSON("ibero.geojson", function(data){
    		L.geoJson(data, {
    			style: app.myStyle("#ff0000")
    		}).addTo(miMapa);})

    		$.getJSON("galeriasluz.geojson", function(data){
    		L.geoJson(data, {
    			style: app.myStyle("#00ff00")
    		}).addTo(miMapa);})
    	}
    	
    	    	

    	miMapa.on('click', function(evento){
    		var texto = 'Marcador en l(' + evento.latlng.lat.toFixed(2) + ') y L(' + evento.latlng.lng.toFixed(2);
    		app.pintarMarcador(evento.latlng, texto, miMapa);
    	})
    	

	},

	myStyle: function(color){
		var routeStyle = {
			"color": color,
			"weight": 5,
			"opacity": 1
		};
		return routeStyle;
	},

	pintarMarcador: function(latlng, texto, mapa){
		var marcador = L.marker(latlng).addTo(mapa);
		marcador.bindPopup(texto).openPopup();
	},

	dibujaCordenadas: function(position){
		var coordsDiv = document.querySelector('#coords');
		coordsDiv.innerHTML = 'Latitud: ' + position.coords.latitude + ' Longitud: ' + position.coords.longitude;
	},

	errorAlSolicitarLocalizacion: function(error){
		console.log(error.code + ': ' + error.message);
	}

};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();		
	}, false);
	//Nos indica que el dispositivo ya esta listo para ejecutar la geoloc.
	document.addEventListener('deviceready', function(){
		app.dispositivoListo();
	}, false);
}



