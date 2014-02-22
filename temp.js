$(document).ready(function() {

	$.ajax({

		url: 'http://search.crossref.org',
		// url: 'http://www.unact.ru',

		success: function(data){

			console.log(data);

		}

	})
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

});
