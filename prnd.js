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
				[
					$('<input />').attr({
						type: 'hidden',
						name: 'num_mag',
						value: Object.keys(result)[0]
					}),

					$('<input />').attr({
						type: 'hidden',
						name: 'art_tit',
						value: 'ВВОД'
					})
				]
			);

			send_prnd_data();

		} else {

			console.log('journal name not unique or not found');

		}

	});

}

function send_prnd_data() {

	$.ajax({

		url: 'http://localhost/~grimax/srvcs/prnd.php',
		type: 'POST',
		data: $('form#result_form').serialize(),

		success: function(data){

			var html_data = $('<div />');
			html_data.append($.parseHTML(data));
			var result = html_data.find('center').text();
			console.log(result);
			show_result(result);

		},

		error: function(jqXHR, textStatus, errorThrown){

			console.log(textStatus);

		}

	})
		
}

function show_result(result) {

	$('body').empty();
	$('body').append($('<span />').addClass('result').text(result));
	$('body').append(
		$('<input />').attr({
			type: 'submit',
			autofocus: 'autofocus',
			value: 'OK'
		}).click(function(){
			$('body').empty();
			form_submit(insert_form());
		})
	);

}



