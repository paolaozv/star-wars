var template = '<div class="col s12 m4">' +
				    '<div class="card horizontal hoverable">' +
				      	'<div class="card-stacked">' +
				        	'<div class="card-content deep-orange lighten-2 white-text">' +
				          		'<p>Hi, my name is <strong>__name__</strong></p>' +
				        	'</div>' +
					        '<div class="card-action">' +
					          	'<a data-show-url="__url__" class="about deep-orange-text">See more about me</a>' +
					        '</div>' +
					    '</div>' +
			    	'</div>' +
			  	'</div>';

var cargarPagina = function() {
	$.getJSON("https://swapi.co/api/people/", mostrarPersonajes);
	$("#next").click(mostrarSiguiente);
	$("#previous").click(mostrarAnterior);
	$("#people").on("click", ".about", mostrarInfo);
};

$(document).ready(cargarPagina);

var mostrarPersonajes = function(response) {
	$("#total").text(response.results.length);
	var personajes = "";
	$.each(response.results, function(i, personaje) {
		personajes += template
					  .replace("__name__", personaje.name)
					  .replace("__url__", personaje.url);
	});
	$("#people").html(personajes);
	$("#next").attr("data-url", response.next);
	$("#previous").attr("data-url", response.previous);
	if (!response.next) {
		$("#next").fadeOut("fast");
	} else {
		$("#next").fadeIn("fast");
	}
	if (!response.previous) {
		$("#previous").fadeOut("fast");
	} else {
		$("#previous").fadeIn("fast");
	}
};

var mostrarSiguiente = function(event) {
	event.preventDefault();
	var url = $(this).attr("data-url");
	$.getJSON(url, mostrarPersonajes);
};

var mostrarAnterior = function(event) {
	event.preventDefault();
	var url = $(this).attr("data-url");
	$.getJSON(url, mostrarPersonajes);
};

var mostrarInfo = function(event) {
	event.preventDefault();

};