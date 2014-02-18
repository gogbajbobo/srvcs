$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	get_jlist();

}

function get_jlist() {

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',
		// url: 'http://www.iptm.ru/index.ru.html',
		// url: 'http://www.unact.ru',

		success: function(data){

			var jlist = $('<list />').attr('id', 'jlist');

			$(jlist).append(function(){

				// console.log($.parseXML(data));
				// return $(data).find('option').text();
				return $(data);

			});

			console.log(data);

		}

	})
		.done(function(){
			// alert('done');
		})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

}
