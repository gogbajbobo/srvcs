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
				name: 'q'
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
				$('span.info').text('items: ' + data.items[0].doi);
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