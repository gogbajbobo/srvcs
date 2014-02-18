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

			var jlist = $('<list />').attr('id', 'jlist');

			$(jlist).append(function(){

				$(data).find('option').each(function(index) {
					 
					console.log(index + ': ' + $(this).text() + ' / ' + $(this).attr('value'));

				});
				return $(data).find('option').text();

			});

			console.log($(jlist));

		}

	})
		.done(function(){
			// alert('done');
		})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

}
