<?php
if(isset($_POST['idvideo'])){
	$idvideo = $_POST['idvideo'];	
}
$result ='';
$url ='https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=10&order=relevance&videoId='.$idvideo.'&key=AIzaSyAz4GcstsJuNq1qnb8Rm-GJ9mQ0hnUdaMs';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$output=curl_exec($ch);                 
$response = $output;
print_r($response);
?>