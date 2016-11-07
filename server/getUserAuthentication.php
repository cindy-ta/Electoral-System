<?php
    require_once '../includes/db.php'; // The mysql database connection script
    //$status = '%';
    if(isset($_GET['user'])){
        $user = $_GET['user'];

        $query="SELECT * FROM Users WHERE username='$user'";
        $result = mysqli_query($db, $query);
        //$result = $mysqli->query($query) or die($mysqli->error.__LINE__);

        # JSON-encode the response
        echo json_encode($result->fetch_assoc());
    }
?>

