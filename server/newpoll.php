<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['title']) && isset($_GET['description']) && isset($_GET['start_date']) && isset($_GET['end_date']) && isset($_GET['level']) && isset($_GET['first_name']) && isset($_GET['last_name']) && isset($_GET['partyname']) && isset($_GET['designation']) && isset($_GET['biography']) && isset($_GET['website']) && isset($_GET['zipcode_start']) && isset($_GET['zipcode_end']) && isset($_GET['manager']))
{
    $title = $_GET['title'];
    $description = $_GET['description'];
    $start_date = $_GET['start_date'];
    $end_date = $_GET['end_date'];
    $level = $_GET['level'];
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $partyname = $_GET['partyname'];
    $designation = $_GET['designation'];
    $biography = $_GET['biography'];
    $website = $_GET['website'];
    $zipcode_start = $_GET['zipcode_start'];
    $zipcode_end = $_GET['zipcode_end'];
    $manager = $_GET['manager'];





    $query="DELETE FROM sessions WHERE session_id='$session'";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);

    $result = $mysqli->affected_rows;

    echo $json_response = json_encode($result);
}
?>