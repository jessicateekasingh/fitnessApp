<?php

header('Content-Type: application/json');
include_once __DIR__ .'/../models/workout.php';

if($_REQUEST['action'] === 'index') {
  echo json_encode(Workouts::all());


} elseif ($_REQUEST['action'] === 'post') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $new_workout = new Workout(null,$body_object->author,$body_object->workout,$body_object->des);
  $all_workouts = Workouts::create($new_workout);
  echo json_encode($all_workouts);
}
elseif ($_REQUEST['action'] === 'update') {
  $request_body = file_get_contents('php://input');
  $body_object = json_decode($request_body);
  $updated_workout = new Workout($_REQUEST['id'], $body_object->author, $body_object->workout, $body_object->des);
  $all_workouts = Workouts::update($updated_workout);
  echo json_encode($all_workouts);

}
elseif ($_REQUEST['action'] === 'delete') {
  $all_workouts = Workouts::delete($_REQUEST['id']);
  echo json_encode($all_workouts);
}

?>
