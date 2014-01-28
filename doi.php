<?php

header('Content-Type: text/html');

echo "<html>
		<head>
			<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
		</head>
		<body>";

if (isset($_GET['doi'])) {

	$crossref_uri = 'http://search.crossref.org';
	$crossref_url = $crossref_uri . '/dois?q=' . trim($_GET['doi']);
	$result = file_get_contents($crossref_url);
	$json = json_decode(utf8_encode($result));

	if (is_null($json[0])) {

		echo 'No DOI data </br></br>';

	} else {

		$doi = $json[0]->{'doi'};
		echo 'DOI URL: ' . $doi . '</br></br>';

		// $score = $json[0]->{'score'};
		// echo 'SCORE: ' . $score . '</br></br>';

		// $normalized_score = $json[0]->{'normalizedScore'};
		// echo 'NORMALIZED SCORE: ' . $normalized_score . '</br></br>';

		// $title = $json[0]->{'title'};
		// echo 'TITLE: ' . $title . '</br></br>';

		$full_citation = $json[0]->{'fullCitation'};
		echo 'FULL CITATION: ' . $full_citation . '</br></br>';

		// $year = $json[0]->{'year'};
		// echo 'YEAR: ' . $year . '</br></br>';

		$coins = html_entity_decode(urldecode($json[0]->{'coins'}));
		$coins = explode('&', $coins);
		echo 'COINS: </br>';

		$authors = '';

		foreach ($coins as $coin) {

			// echo $coin . $new_line;
			$coin = explode('=', $coin);
			$value_title = '';

			switch ($coin[0]) {
			 	case 'rft.atitle':
			 		$value_title = 'Article title: ';
			 		break;		 	
			 	case 'rft.genre':
			 		$value_title = 'Genre: ';
			 		break;		 	
			 	case 'rft.jtitle':
			 		$value_title = 'Journal title: ';
			 		break;
			 	case 'rft.date':
			 		$value_title = 'Date: ';
			 		break;
			 	case 'rft.volume':
			 		$value_title = 'Volume: ';
			 		break;
			 	case 'rft.issue':
			 		$value_title = 'Issue: ';
			 		break;
			 	case 'rft.spage':
			 		$value_title = 'Start page: ';
			 		break;
			 	case 'rft.epage':
			 		$value_title = 'End page: ';
			 		break;
			 	case 'rft.au':
			 		$value_title = 'Author: ';
			 		$authors == '' ? $authors = $coin[1] : $authors = $authors . ', ' . $coin[1];
			 		break;
			 	default:
			 		break;
			 } 

			if ($value_title != '' && $value_title != 'Author: ') {
				echo '<b>' . $value_title . '</b>' . $coin[1] . '</br>';
			}



		}

		if ($authors != '') {
			echo '<b>Authors: </b>' . $authors . '</br></br>';
		}

		// echo '</br> var_dump: </br>';
		// var_dump($json);
		// echo '</br></br>';

	}

	echo '<a href="?">Search another DOI</a>';

} else {

	echo "	<form>
				DOI: <input type='text' name='doi'>
				<input type='submit' value='Submit'>
			</form>";

}

echo "	</body>
</html>";


?>