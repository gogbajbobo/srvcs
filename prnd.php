<?php

include 'authorization.php';

header('Content-Type: text/html');

	$opts = array(
		'http'=>array(
			'method' => 'GET',
			'header' => 'Authorization: ' . $iptm_auth
		)
	);

	$context = stream_context_create($opts);
	$file = file_get_contents('https://www.iptm.ru/int/addarticle.ru.html', false, $context);
	echo $file;

?>