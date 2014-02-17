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

				// console.log($.parseXML(data));
				return $(data).find('select');

			});

			console.log(jlist);

		}

	})
		.done(function(){
			// alert('done');
		})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			// 

		});

}
