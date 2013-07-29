<?php

include_once('jsonFuncs.php');

$postData = file_get_contents('php://input');
//$postData = file_get_contents('taskData.json');

$xmldata = json2xml($postData);

if ($xmldata) {

	$xmldoc = new DOMDocument();
	$xmldoc->loadXML($xmldata);
	
	$xsldoc = new DOMDocument();
	$xsldoc->load('xidok.xsl');
	$xslt = new XSLTProcessor();
	$xslt->importStylesheet($xsldoc);
	$xmldoc = $xslt->transformToDoc($xmldoc);
	
	//header("Content-type: text/xml");
	//echo $xmldoc->saveXML();

	header('Content-type: application/json');
	echo xml2json(simplexml_import_dom($xmldoc));
	
} else {	
	echo ' - Fail';	
}

?>