$( document ).ready(function() {

    doc_ready();

});

function doc_ready() {

	form_submit();

}

function form_submit() {

	$( 'form#doi' ).submit(function( event ) {
		// alert('form_submit' + event.target);
		event.preventDefault();
		send_form(this);
	});

}

function send_form(form) {

	// alert($(form).serialize());

	var request = $.ajax({
		url: 'http://search.crossref.org/dois?',
		type: 'GET',
		data: $(form).serialize()
	});

	request.done(function(){
	    $( 'span.info' ).text( request.responseText );
	});

	request.fail(function(){
	    $( 'span.info' ).text( 'request.fail' );		
	});

}