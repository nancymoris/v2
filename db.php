<?php
/*********************conectionWithServer*********************/
$server='localhost';	
$username='root';
$password='';
$DBname='learnAlph'; 
$conn=mysqli_connect($server,$username,$password);
if(!$conn)					
    die("can not connect to the server $server");
/*********************createDB&Table********************/
$q=mysqli_query($conn,"CREATE DATABASE IF NOT EXISTS $DBname");	
if(!$q)
    die("failed to create the database $DBname");	
mysqli_select_db($conn,"$DBname");
$sql="
CREATE TABLE IF NOT EXISTS action (
type VARCHAR(10) NOT NULL,
time VARCHAR(40) NOT NULL,
target VARCHAR(100)
)
";
$q=mysqli_query($conn,$sql);	//$q=$con->query($sql);
if(!$q)
    echo mysqli_error($conn);	
/***********************recevingData************************/
if(isset($_POST['action'])){
   $action = json_decode($_POST['action'], true);
   //print_r($action);
    for($j = 0; $j < 4; $j++){
        $i=0;
        while ($action[$j][$i]["type"]!=""){
            $type = $action[$j][$i]["type"];
            $time = $action[$j][$i]["time"];
            $target = $action[$j][$i]["target"];
            $sql = "Insert Into action values('$type', '$time', '$target')";
            $conn->query($sql);
            if($conn->affected_rows > 0){
                echo "Success";
            }
            $i=$i+1;
        }
    }
}

if(isset($_GET['action'])){
    $sql = "Select * from action"; 
    if ($result =mysqli_query($conn,$sql)){
     $rows = array();
     if($result){
         while($row = mysqli_fetch_assoc($result)){
             array_push($rows, $row);
         }
         echo json_encode($rows);
      }
    }

}

















?>