<?php

include_once('jsonFuncs.php');

header('Content-type: application/json');

$src = isset($_GET['src']) ? $_GET['src'] : null;

switch ($src) {
	case 'trmnltest':
		
		$source = 'terminalTestData.json';
		$jsonData = file_get_contents($source);
		
		if (json_decode($jsonData)) {
			
			echo $jsonData;
			
		} else {
			
			echo $source;
			echo jsonError();
			
		}
		break;
	
	default:
		echo 'test data source';
		break;
}
	
	
?>