<?php
if(isset($_POST['id'])){
	$id = $_POST['id'];	
}
$result ='';
$url ='https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet%2CcontentDetails&maxResults=50&chart=mostPopular&videoCategoryId='.$id.'&key=AIzaSyAz4GcstsJuNq1qnb8Rm-GJ9mQ0hnUdaMs';
$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$output=curl_exec($ch);                 
$response = $output;
print_r($response);
?>