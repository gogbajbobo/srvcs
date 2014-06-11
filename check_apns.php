<?php

date_default_timezone_set('UTC');

$postData = file_get_contents('php://input');

$filename = '/var/log/check_apns.log';

$data = count(file($filename)) . ' ' . date('l jS \of F Y h:i:s A') . "\r\n";
echo $data;

file_put_contents($filename, $data, FILE_APPEND);

?>