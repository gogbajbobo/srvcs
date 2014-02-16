$(document).ready(function() {

    doc_ready();

});

function doc_ready() {

	form_submit(insert_form());
	$('body').append($('<span />').addClass('info'));

}

function insert_form() {

	form = $('<form />').attr('id', 'doi_form');
	$('body').append(form);
	$(form).append(
		$('<label />').append(
			'DOI:',
			$('<input />').attr({
				type: 'text',
				name: 'q',
				autofocus: 'autofocus',
// 
				value: '10.1063/1.1332401'
// 
			})
		),
		$('<input />').attr({
			type: 'hidden',
			name: 'header',
			value: 'true'
		}),
		$('<input />').attr({
			type: 'submit',
			value: 'OK'
		})
	);
	return form;

}

function form_submit(form) {

	$(form).submit(function(event) {
		event.preventDefault();
		send_form(this);
	});

}

function send_form(form) {

	$.ajax({

		url: 'http://search.crossref.org/dois?',
		type: 'GET',
		dataType: 'json',
		data: $(form).serialize(),

		success: function(data){

			if (data.totalResults != 1) {
				$('span.info').text('wrong doi, totalResults: ' + data.totalResults);
			} else {
				show_result_form(data);
			}

		}

	})
		.done(function(){
			// alert('done');
		})
		
		.fail(function(jqXHR, textStatus, errorThrown){

				$('span.info').text(textStatus + errorThrown);

		});

}

function show_result_form(data) {

	$('body').empty();
	form = $('<form />').attr('id', 'result_form');
	$('body').append(form);

	$(form).append(result_inputs(data));
	$('<br />').insertAfter('label');
	$('input:text').each(function(){
		$(this).attr({
			size: this.value.length
		})
	});

}

function result_inputs(data) {

	var item = data.items[0];
	var coins = parse_coins(item.coins);
	console.log(coins);

	var inputs =
		[
			$('<label />').append(
				'Doi: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: item.doi
				})
			),

			$('<label />').append(
				'Article title: ',
				$('<input />').attr({
					type: 'text',
					name: 'atitle',
					value: coins['rft.atitle']
				})
			),

			$('<label />').append(
				'Journal title: ',
				$('<input />').attr({
					type: 'text',
					name: 'jtitle',
					value: coins['rft.jtitle']
				})
			),

			$('<label />').append(
				'Date: ',
				$('<input />').attr({
					type: 'text',
					name: 'date',
					value: coins['rft.date']
				})
			),

			$('<label />').append(
				'Issue: ',
				$('<input />').attr({
					type: 'text',
					name: 'issue',
					value: coins['rft.issue']
				})
			),

			$('<label />').append(
				'Volume: ',
				$('<input />').attr({
					type: 'text',
					name: 'volume',
					value: coins['rft.volume']
				})
			),

			$('<label />').append(
				'Start page: ',
				$('<input />').attr({
					type: 'text',
					name: 'spage',
					value: coins['rft.spage']
				})
			),

			$('<label />').append(
				'End page: ',
				$('<input />').attr({
					type: 'text',
					name: 'epage',
					value: coins['rft.epage']
				})
			),

			$('<label />').append(
				'Genre: ',
				$('<input />').attr({
					type: 'text',
					name: 'genre',
					value: coins['rft.genre']
				})
			),

			$('<label />').append(
				'Authors: ',
				$('<input />').attr({
					type: 'text',
					name: 'authors',
					value: coins['authors']
				})
			),

			$('<label />').append(
				'Number of authors: ',
				$('<input />').attr({
					type: 'text',
					name: 'number_of_authors',
					value: coins['number_of_authors']
				})
			),

			$('<input />').attr({
				type: 'submit',
				value: 'OK',
				autofocus: 'autofocus'
			})
		]

	return inputs;

}

function parse_coins(coins) {

	console.log($.now());

	var result_array = {};
	var coins_array = coins.split('&amp;');
	var number_of_authors = 0;
	var authors = '';

	$(coins_array).each(function(index) {

		var coin = decodeURIComponent(this);
		var coin_parts = coin.split('=');
		coin_parts[1] = coin_parts[1].split('+').join(' ');

		if (coin_parts[0] == 'rft.au') {

			authors = number_of_authors ? authors + ',' + coin_parts[1] : coin_parts[1];
			number_of_authors = number_of_authors + 1;
			coin_parts[0] = coin_parts[0] + number_of_authors;

		}

		result_array[coin_parts[0]] = coin_parts[1];
		// console.log(index + ': ' + coin_parts[0] + ' / ' + coin_parts[1]);

	});

	result_array['authors'] = authors;
	result_array['number_of_authors'] = number_of_authors;
	// console.log(result_array);
	return result_array;

}


