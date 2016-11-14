<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['first_name']) && isset($_GET['last_name']) && isset($_GET['government_ID']) && isset($_GET['age']) && isset($_GET['gender']) && isset($_GET['contact_number']) && isset($_GET['address_line1']) && isset($_GET['address_line2']) && isset($_GET['city']) && isset($_GET['state']) && isset($_GET['country']) && isset($_GET['zip_code']))
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