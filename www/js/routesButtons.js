var app = {
	inicio: function(){
		this.iniciaBotones();
	},

	iniciaBotones: function(){
		var rutasButtons = document.querySelectorAll('.button-ruta');
		rutasButtons[0].addEventListener('click', function(){
			pathMapa = "ibero.geojson";
			localStorage.setItem("storageName",pathMapa);
		});
		rutasButtons[1].addEventListener('click', function(){
			pathMapa = "galeriasluz.geojson";
			localStorage.setItem("storageName",pathMapa);
		});
		rutasButtons[2].addEventListener('click', function(){
			pathMapa = "todas";
			localStorage.setItem("storageName",pathMapa);
		});
	}
};
var pathMapa;

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	})
}