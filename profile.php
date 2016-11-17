<?php
session_start();
?>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script src="kokeiluja.js"></script>	
<html>

<?php
if(isset($_SESSION['CurrentUser'])){
	echo "Welcome  " . $_SESSION['CurrentUser'] . " This is your Profile";	
}
	else
	echo "You're   not  logged in!";	
?>



</html>