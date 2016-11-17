<?php
session_start();
?>

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="style.css">	
	<script src="js/lunch_menu.js"></script>
<html>
<body>
<?php
// username ja password muuttujat
$dbName = "Aaro";
$dbPass = "Lyytinen";
// ulos kirjautuminen
if(isset($_GET['logout']))
{
	session_unset();
	session_destroy();
	echo"You've been logged out!";
}
// sisään kirjautuminen
if(isset($_POST['Login']))
{
	$userName = $_POST['username'];
	$passWord = $_POST['password'];
	if($userName === $dbName){
		if ($passWord === $dbPass){
		$_SESSION['CurrentUser'] = $userName;  // luo sessio		
		include 'kokeiluja.html';
			include 'profile.php';
		}
		else{
		ShowForm("Wrong password!");		// Väärä salasana, oikea käyttäjätunnus
			}
		}
		else{
		ShowForm("Username not found!");	// Väärä käyttäjätunnus
		}	
}
	else{
		ShowForm("Please Enter your Username and Password"); // Kumpakaan muuttujaa (userName/passWord) ei ole asetettu, näyttää tämän
		}
function ShowForm($message) // Funktio, joka näyttää kirjautumispohjan ja tarvittaessa viestin $message
{
include 'Form.html';
	echo $message;
}		

?>



</body>
</html>