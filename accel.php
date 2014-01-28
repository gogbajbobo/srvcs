<?php

include_once('jsonFuncs.php');

$postData = file_get_contents('php://input');
//$postData = file_get_contents('taskData.json');

if ($postData) {
	
	$time = microtime(true);
	$time = str_replace('.', '_', $time);
	// echo $time;
	
	$dirName = '/tmp/accel/';
	
	if (checkDir($dirName)) {
		
		$fileName = $dirName . $time . '.acceldata';					
		file_put_contents($fileName, $postData, FILE_APPEND);
		echo $fileName . ' saved';

	} else {
		
		echo 'directory error ' . $dirName;
		
	}

} else {
	
	echo 'no postData';	
	
}

function checkDir($dirName) {

	if (file_exists($dirName)) {
		
		return true;
		
	} else {

		return mkdir($dirName);
	
	}
	
}


//$xmldata = json2xml($postData);
//
//if ($xmldata) {
//
//	$xmldoc = new DOMDocument();
//	$xmldoc->loadXML($xmldata);
//	
//	$xsldoc = new DOMDocument();
//	$xsldoc->load('xidok.xsl');
//	$xslt = new XSLTProcessor();
//	$xslt->importStylesheet($xsldoc);
//	$xmldoc = $xslt->transformToDoc($xmldoc);
//	
//	//header("Content-type: text/xml");
//	//echo $xmldoc->saveXML();
//
//	header('Content-type: application/json');
//	echo xml2json(simplexml_import_dom($xmldoc));
//	
//} else {	
//	echo ' - Fail';	
//}

?>