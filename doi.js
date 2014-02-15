$( document ).ready(function() {

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

}

function result_inputs(data) {

	var item = data.items[0];
	var coins = parse_coins(item.coins);
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
				'Article title: ' + data.items[0].coins,
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].coins
				})
			),

			$('<label />').append(
				'Journal title: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].doi
				})
			),

			$('<label />').append(
				'Date: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].doi
				})
			),

			$('<label />').append(
				'Genre: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].doi
				})
			),

			$('<label />').append(
				'Authors: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].doi
				})
			),

			$('<label />').append(
				'Number of authors: ',
				$('<input />').attr({
					type: 'text',
					name: 'doi',
					value: data.items[0].doi
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

	var result_array;
	var coins_array = coins.split('&');
	console.log(coins_array[0]);
	coins_array.each(function( index ) {
  console.log( index + ": " + $( this ).text() );
});

	// coins_array.foreach(function(name){
	// 	console.log('test');
	// });

}


