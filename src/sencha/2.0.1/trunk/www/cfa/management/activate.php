<?php
 $fp = fopen('downloaded.log', 'a+');
 $data = "+".$_POST['firstname'] ."\t". $_POST['lastname']."\t".$_POST['agency']."\t".$_POST['email']."\t".$_POST['phone']."\t".date("M-d-Y: H:i:s e")."\n";
 fwrite($fp, $data);
 fclose($fp);
 echo("<a href="."http://www.google.com.vn/".">Click here</a> to download.");
?>