$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	get_jlist();

}

function get_jlist() {

	$.ajax({

		url: 'https://www.iptm.ru/int/addarticle.ru.html',
		crossDomain: true,
		// headers: {
		// 	'Origin': '*'
		// },
		// type: 'GET',
		// dataType: 'json',
		// data: $(form).serialize(),

		success: function(data){

			console.log(data);

		}

	})
		.done(function(){
			// alert('done');
		})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			// 

		});

}
