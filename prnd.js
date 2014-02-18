$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	get_jlist();

}

function get_jlist() {

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',

		success: function(data){

			var jlist = {};

			$(data).find('option').each(function(index) {
				 
				jlist[$(this).attr('value')] = $.trim($(this).text());

			});

			parse_list(jlist);

		}

	})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

}

function parse_list (jlist) {

	var test_string = 'nature';

	$.each(jlist, function(key, value){

		if (value.toLowerCase().indexOf(test_string) >= 0) {

			console.log(key + ' : ' + value);

		}

	})

}
