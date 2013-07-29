<?php

function jsonInit($json) {
	
	$jsonArray = json_decode($json, true);
	
	if (!$jsonArray) {

		jsonError();
		return null;
	
	} else {
		
		return $jsonArray;
	
	}

}

function jsonError() {
	
	echo 'JSON error';
	switch (json_last_error()) {
		case JSON_ERROR_NONE:
			echo ' - No errors (no json data)';
		break;
		case JSON_ERROR_DEPTH:
			echo ' - Maximum stack depth exceeded';
		break;
		case JSON_ERROR_STATE_MISMATCH:
			echo ' - Underflow or the modes mismatch';
		break;
		case JSON_ERROR_CTRL_CHAR:
			echo ' - Unexpected control character found';
		break;
		case JSON_ERROR_SYNTAX:
			echo ' - Syntax error, malformed JSON';
		break;
		case JSON_ERROR_UTF8:
			echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
		break;
		default:
			echo ' - Unknown error';
		break;
	}

}

function json2xml($json) {
	
	$json = jsonInit($json);
	
	if ($json) {

		$sxe = new SimpleXMLElement('<json2xml/>');
		
		$sxe = array2xml($json, $sxe);
		
		return $sxe->asXML();
	
	} else {
		return null;
	}

}

function array2xml($array, $sxe) {
	
	foreach ($array as $key => $value) {
				
		if (is_numeric($key)) $key = $sxe->getName() . $key;
		
		if (is_array($value)) {

			$keyNode = $sxe->addChild($key);			
			$value = array2xml($value, $keyNode);
			
		} elseif ($value) {
			
			$sxe->addChild($key, $value);			
			
		}

	}
	
	return $sxe;
	
}

function xml2json($sxe) {
	
	$sol = array();
	
	if ($sxe->getName() == 'json2xml') {
		
		$data = array();
		
		foreach ($sxe->data->datum as $datum) {
			
			$datumArray = array();
			
			foreach ($datum->children() as $child) {
				
				$datumArray[$child->getName()] = (string)$child;
				
			}
			
			$data[count($data)] = $datumArray;
			
		}
		
		$sol['data'] = $data;		
		return json_encode($sol);
		
	} else {
		echo 'wrong xml structure';
		return null;
	}
	
}

function isValidXmlElementName($name) {

	try {
		
		new DOMElement($name);
		
	} catch (DOMException $e) {
		
		return false;
	
	}
	
	return true;

}


?>