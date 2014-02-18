$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	jlist_array = get_jlist();
	console.log(jlist_array);

}

function get_jlist() {

	var jlist_array = {};

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',

		success: function(data){

			$(data).find('option').each(function(index) {
				 
				jlist_array[$(this).attr('value')] = $(this).text();

			});

		}

	})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

	return jlist_array;

}
