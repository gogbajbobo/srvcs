$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	form_submit(insert_form());

}

function get_jlist(find_journal) {

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',

		success: function(data){

			var jlist = {};

			$(data).find('option').each(function(index) {
				 
				jlist[$(this).attr('value')] = $.trim($(this).text());

			});

			find_journal(jlist);

		}

	})
		
		.fail(function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		});

}

function send_result_form(form) {

	// console.log('prnd send_result_form');
	// console.log(form);

	find_journal_in_list($('form input[name="jtitle"]').attr('value'));

}

function find_journal_in_list (jtitle) {

	get_jlist(function(jlist){

		$.each(jlist, function(key, value){

			if (value.toLowerCase().indexOf(jtitle.toLowerCase()) >= 0) {

				console.log(key + ' : ' + value);

			}

		});

		console.log('finish search for ' + jtitle);

	});

}
