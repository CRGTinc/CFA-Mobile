<?php
 $logPath = 'Log\Downloaded.log';
 writeLog($logPath);
 sendDownloadLink();
 
 
 function writeLog($path){
	$fp = fopen($path, 'a+');
 	$data = "+".$_POST['firstname'] ."\t". $_POST['lastname']."\t".$_POST['agency']."\t".$_POST['email']."\t".$_POST['phone']."\t".date("M-d-Y: H:i:s e")."\n";
 	fwrite($fp, $data);
 	fclose($fp);
 }
 
 function sendDownloadLink(){
	 $protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']), 'https') === FALSE ? 'http' : 'https';
	 $host = $_SERVER['HTTP_HOST'];
	 $link = $protocol. "://" . $host. "/distribution/TestFile";
	 
	 $to = $_POST['email'];
	 $subject = 'CFA Application Distribution';
	 $message = 'Please download application by following this <a href=' .$link .' download="TestFile">link</a>';
	 $header = 'Cc: c3appfeedback@gmail.com' . "\r\n";
	 $header .= 'MIME-Version: 1.0' . "\r\n";
	 $header .= 'Content-type: text/html; charset=iso8859-1' . "\r\n";
	 mail($to, $subject, $message, $header);
 }
?>

<link rel="stylesheet" href="resources/css/management.css"/>
<div class="gradient-bar title-bar">
	<div class="title">Application Distribution</div>
</div>

<div class="notify-panel">
    An email with the application download link are sent to <?php echo $_POST['email']?>. Please check your mail for more information
</div>