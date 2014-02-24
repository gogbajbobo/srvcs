<?php

include 'authorization.php';

$url = 'https://www.iptm.ru/int/addarticle.ru.html';

$postData = file_get_contents('php://input');

if (!$postData) {

	header('Content-Type: text/html');

	$options = array(
		'http'=>array(
			'method' => 'GET',
			'header' => 'Authorization: ' . $iptm_auth
		)
	);
	$context = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	echo mb_convert_encoding($result, 'UTF-8', 'KOI8-R');

} else {

	// var_dump($postData);

	$options = array(
	    'http' => array(
	        'method'  => 'POST',
			'header' => 'Authorization: ' . $iptm_auth,
	        'content' => $postData
	    ),
	);
	$context  = stream_context_create($options);
	$result = file_get_contents($url, false, $context);
	echo mb_convert_encoding($result, 'UTF-8', 'KOI8-R');

}

?>