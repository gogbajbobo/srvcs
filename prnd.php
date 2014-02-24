<?php

include 'authorization.php';

$postData = file_get_contents('php://input');

if (!$postData) {

	header('Content-Type: text/html');

	$opts = array(
		'http'=>array(
			'method' => 'GET',
			'header' => 'Authorization: ' . $iptm_auth
		)
	);

	$context = stream_context_create($opts);
	$file = file_get_contents('https://www.iptm.ru/int/addarticle.ru.html', false, $context);
	echo mb_convert_encoding($file, 'UTF-8', 'KOI8-R');

} else {

	echo $postData;

}

?>