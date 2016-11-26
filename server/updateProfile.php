<?php
require_once '../includes/db.php'; // The mysql database connection script

if(isset($_GET['first_name']) && isset($_GET['last_name']) && isset($_GET['government_ID']) && isset($_GET['age']) && isset($_GET['gender']) && isset($_GET['contact_number']) && isset($_GET['address_line1']) && isset($_GET['address_line2']) && isset($_GET['city']) && isset($_GET['state']) && isset($_GET['country']) && isset($_GET['zip_code']))
{
    $first_name = $_GET['first_name'];
    $last_name = $_GET['last_name'];
    $government_ID = $_GET['government_ID'];
    $age = $_GET['age'];
    $gender = $_GET['gender'];
    $contact_number = $_GET['contact_number'];
    $address_line1 = $_GET['address_line1'];
    $address_line2 = $_GET['address_line2'];
    $city = $_GET['city'];
    $state = $_GET['state'];
    $country = $_GET['country'];
    $zip_code = $_GET['zip_code'];
    $user_name = $_GET['user_name'];
    $user_type = $_GET['user_type'];
    $isUpdated = $_GET['isUpdated'];

    $address_id = 1;

    if($isUpdated == "false"){
        $success = 1111;
        $query="Select max(address_id) as id from Addresses";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        if($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $address_id = $row["id"] + 1;
            }
        }

        $success = 1;

        $query="INSERT INTO Addresses (address_id,line_1,line_2,city,state,country,zip_code)  VALUES ('$address_id', '$address_line1', '$address_line2', '$city', '$state', '$country', '$zip_code')";
        $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
        $result = $mysqli->affected_rows;

        if($user_type == "Voter")
        {
            $query="INSERT INTO Voters (voter_id,first_name,last_name,government_id,age,gender,contact_number,address_id)  VALUES ('$user_name', '$first_name', '$last_name', '$government_ID', '$age', '$gender', '$contact_number', '$address_id')";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;

            if($result > 0)
            {
                $success = 1111;
            }
        }else
        {
            $query="INSERT INTO Managers (manager_id,first_name,last_name,government_id,age,gender,contact_number,address_id)  VALUES ('$user_name', '$first_name', '$last_name', '$government_ID', '$age', '$gender', '$contact_number', '$address_id')";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;

            if($result > 0)
            {
                $success = 1111;
            }
        }
    }else{

       if($user_type == "Voter"){
            $query="UPDATE Voters, Addresses SET first_name='$first_name', last_name='$last_name', government_id='$government_ID', age='$age', gender='$gender', contact_number='$contact_number', line_1='$address_line1', line_2='$address_line2', city='$city', state='$state', country='$country', zip_code='$zip_code' WHERE voter_id='$user_name' AND Voters.address_id = Addresses.address_id";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
            if($result > 0)
            {
                $success = 1111;
            }
       }else{
            $query="UPDATE Managers, Addresses SET first_name='$first_name', last_name='$last_name', government_id='$government_ID', age='$age', gender='$gender', contact_number='$contact_number', line_1='$address_line1', line_2='$address_line2', city='$city', state='$state', country='$country', zip_code='$zip_code' WHERE manager_id='$user_name' AND Managers.address_id = Addresses.address_id";            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
            if($result > 0)
            {
                $success = 1111;
            }
       }
    }

    echo $json_response = json_encode($success);

}
?>