<?php
 $fp = fopen('Log\Downloaded.log', 'a+');
 $data = "+".$_POST['firstname'] ."\t". $_POST['lastname']."\t".$_POST['agency']."\t".$_POST['email']."\t".$_POST['phone']."\t".date("M-d-Y: H:i:s e")."\n";
 fwrite($fp, $data);
 fclose($fp);
?>

<div class="container" >
<p> Please enter your name and email address. A download link for the CFA Mobile App will be emailed to you. You can open this link in the browser on your iPad to complete the download process.
</p>
</div>