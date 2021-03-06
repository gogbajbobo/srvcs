<?php

header('Content-Type: text/html');

echo "<html>
		<head>
			<meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
		</head>
		<body>";

if (isset($_GET['doi']) && !empty($_GET['doi'])) {

	$crossref_uri = 'http://search.crossref.org';
	$crossref_url = $crossref_uri . '/dois?q=' . trim($_GET['doi'] . '&header=true');
	$result = file_get_contents($crossref_url);
	$json = json_decode(utf8_encode($result));

	$totalResults = $json->totalResults;

	if ($totalResults == 0) {

		echo 'No DOI data <br /><br />';

	} elseif ($totalResults != 1) {

		echo 'Wrong DOI, multiple results recieved <br /><br />';

	} else {

		$item = $json->items[0];

		$doi = $item->doi;
		echo 'DOI URL: <a href="' . $doi . '">' . $doi .'</a><br /><br />';

		// $score = $item->{'score'};
		// echo 'SCORE: ' . $score . '<br /><br />';

		// $normalized_score = $item->{'normalizedScore'};
		// echo 'NORMALIZED SCORE: ' . $normalized_score . '<br /><br />';

		// $title = $item->{'title'};
		// echo 'TITLE: ' . $title . '<br /><br />';

		$full_citation = $item->fullCitation;
		echo 'FULL CITATION: ' . $full_citation . '<br /><br />';

		// $year = $item->{'year'};
		// echo 'YEAR: ' . $year . '<br /><br />';

		$coins = html_entity_decode(urldecode($item->coins));
		$coins = explode('&', $coins);
		echo 'COINS: <br />';

		$authors = [];

		foreach ($coins as $coin) {

			// echo $coin . $new_line;
			$coin = explode('=', $coin);
			$value_title = '';
			$coin[1] = strip_tags($coin[1]);

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
			 		$authors[] = $coin[1];
			 		break;
			 	default:
			 		break;
			 } 

			if ($value_title != '' && $value_title != 'Author: ') {
				echo '<b>' . $value_title . '</b>' . $coin[1] . '<br />';
			}



		}

		if ($authors != '') {
			echo '<b>Authors: </b>' . implode(',', $authors) . '<br />';
			echo '<b>Number of authors: </b>' . count($authors) . '<br /><br />';
		}

		// echo '<br /> var_dump: <br />';
		// var_dump($result);
		// echo '<br /><br />';

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