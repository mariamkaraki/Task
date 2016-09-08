<?php
$url ='https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=AIzaSyAz4GcstsJuNq1qnb8Rm-GJ9mQ0hnUdaMs';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$output=curl_exec($ch);                 
$response = $output;
print_r($response);
?>
