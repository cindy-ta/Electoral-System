<?php
require_once '../includes/db.php'; // The mysql database connection script
if(isset($_GET['linkCandidates']) && isset($_GET['newPoll']) )
{
    $linkCandidates = json_decode($_GET['linkCandidates'], true);
    $newPoll = json_decode($_GET['newPoll'], true);


    $title = $newPoll['title'];
    $description = $newPoll['description'];
    $start_date = $newPoll['datetime_start'];
    $end_date = $newPoll['datetime_end'];
    $level = $newPoll['election_level'];


    $election_id = 1;
    $query="Select max(election_id) as id from Elections";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $election_id = $row["id"] + 1;
        }
    }

    $query="INSERT INTO Elections (election_id, title, description, start_date, end_date, level)  VALUES ('$election_id', '$title', '$description', '$start_date', '$end_date', '$level')";
    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
    $result = $mysqli->affected_rows;
    if($result == 1)
    {
        $links = count($linkCandidates);
        for( $i = 0; $i < $links; $i++ )
        {
            $sublevel = 1;
            $linkCandidate = $linkCandidates[$i];

            if ($level == "Country") {
                $sublevel = (int)$linkCandidate['state']['state_id'];
            } else if ($level == "State") {
                $sublevel = (int)$linkCandidate['county']['county_id'];
            } else {
                $sublevel = (int)$linkCandidate['precinct']['precinct_id'];
            }

            $link_id = 1;
            $query="Select max(link_id) as id from Links where election_id = '$election_id'";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            if($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    $link_id = $row["id"] + 1;
                }
            }


            $query="INSERT INTO Links (link_id, election_id, sublevel)  VALUES ('$link_id', '$election_id', '$sublevel')";
            $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
            $result = $mysqli->affected_rows;
            if($result == 1)
            {
                $linkCandidate['id'] = $link_id;
            }else
            {
                echo $json_response = json_encode("Error saving the link");
                exit();
            }

            $candidatesCount = count($linkCandidate['candidates']);
            for($j = 0; $j < $candidatesCount; $j++)
            {
                $candidate = $linkCandidate['candidates'][$j];

                $candidate_id = 3001;
                $query="Select candidate_id from Candidates";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                if($result->num_rows > 0) {
                    $query="Select max(candidate_id) as id from Candidates";
                    $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                    if($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            $candidate_id = $row["id"] + 1;
                        }
                    }
                }

                $first_name = $candidate['firstname'];
                $last_name = $candidate['lastname'];
                $party_name = $candidate['partyname'];
                $designation = $candidate['designation'];
                $bio = $candidate['biograpy'];
                $website_link = $candidate['website'];

                $query="INSERT INTO Candidates (candidate_id, first_name, last_name, party_name, designation, bio, website_link)  VALUES ('$candidate_id', '$first_name', '$last_name', '$party_name', '$designation', '$bio', '$website_link')";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                $result = $mysqli->affected_rows;
                if($result == 1)
                {
                    $linkCandidate['candidates'][$j]['id'] = $candidate_id;
                }else
                {
                    echo $json_response = json_encode("Error saving the new candidate");
                    exit();
                }

                $votes = 0;
                $query="INSERT INTO Link_Candidate_Relations (link_id, election_id, candidate_id, votes)  VALUES ('$link_id', '$election_id', '$candidate_id', '$votes')";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                $result = $mysqli->affected_rows;
                if($result == 1)
                {

                }else
                {
                    echo $json_response = json_encode("Error creating the link candidate relation for new candidates");
                    exit();
                }

            }

            $candidatesCount = count($linkCandidate['existingCandidates']);
            for($j = 0; $j < $candidatesCount; $j++)
            {
                $candidate = $linkCandidate['existingCandidates'][$j]['candidate'];
                $candidate_id = $candidate['candidate_id'];
                $votes = 0;
                $query="INSERT INTO Link_Candidate_Relations (link_id, election_id, candidate_id, votes)  VALUES ('$link_id', '$election_id', '$candidate_id', '$votes')";
                $result = $mysqli->query($query) or die($mysqli->error.__LINE__);
                $result = $mysqli->affected_rows;
                if($result == 1)
                {

                }else
                {
                    echo $json_response = json_encode("Error saving the link candidate relation for existing candidates");
                    exit();
                }
            }
        }

        echo $json_response = json_encode("New Poll created successfully!!");

    }else
    {
        echo $json_response = json_encode("Error saving the election details");
    }

}
?>