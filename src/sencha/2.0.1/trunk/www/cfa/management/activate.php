<?php
require_once 'swift/swift_required.php';

if(!isset($_POST['submit'])) {
    $logPath = 'Log/Downloaded.log';
    writeLog($logPath);
    sendDownloadLink();
    displayNotify();
} else {
    echo ('Please enter your information in <a href= "http://cfa.dynagility.net/management/download.php">here</a> first');
}

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
     $cc = "lieukimnhut@gmail.com";
     $name =  $_POST['firstname']." ".$_POST['lastname'];
     $subject = 'CFA Application Distribution';
     $text = 'Please download application by following this <a href="http://apps.dynagility.net/cfa/">link</a>';
     
     
     // Create the Transport
    $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
      ->setUsername('c3appdistribution')
      ->setPassword('19001560')
      ;

    // Create the Mailer using your created Transport
    $mailer = Swift_Mailer::newInstance($transport);
    // Create a message
    $message = Swift_Message::newInstance($subject)
      ->setFrom(array('c3appdistribution@gmail.com' => 'c3appdistribution'))
      ->setTo(array( $to => $name))
      ->setCc(array( $cc => "Administrative"))
      ->addPart($text, 'text/html')
      ;
    
    // Send the message
    $result = $mailer->send($message);
}

function displayNotify(){
    $email = $_POST['email'];
    echo (
    '<link rel="stylesheet" href="resources/css/management.css"/>.
    <div class="gradient-bar title-bar">
        <div class="title">Application Distribution</div>
    </div>
    
    <div class="notify-panel">
        An email with the application download link are sent to'.$email.'. Please check your mail for more information
    </div>');
    
}
?>
