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

		var result = {};

		$.each(jlist, function(key, value){

			if (value.toLowerCase().indexOf(jtitle.toLowerCase()) >= 0) {

				result[key] = value;

			}

		});

		console.log('finish search for "' + jtitle + '" with ' + Object.keys(result).length + ' result');

		if (Object.keys(result).length == 1) {

			console.log(Object.keys(result)[0]);

			$('form#result_form').append(
				$('<input />').attr({
					type: 'hidden',
					name: 'num_mag',
					value: Object.keys(result)[0]
				})
			);

			send_prnd_data();

		};

	});

}

function send_prnd_data() {

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',
		type: 'POST',
		data: $('form#result_form').serialize(),

		success: function(data){

			console.log(data);

		},

		error: function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		}

	})
		
}

