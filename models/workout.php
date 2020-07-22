<?php
$dbconn = null;
if(getenv('DATABASE_URL')){
    $connectionConfig = parse_url(getenv('DATABASE_URL'));
    $host = $connectionConfig['host'];
    $user = $connectionConfig['user'];
    $password = $connectionConfig['pass'];
    $port = $connectionConfig['port'];
    $dbname = trim($connectionConfig['path'],'/');
    $dbconn = pg_connect(
        "host=".$host." ".
        "user=".$user." ".
        "password=".$password." ".
        "port=".$port." ".
        "dbname=".$dbname
    );
}
else {
    $dbconn = pg_connect("host=localhost dbname=fitnessapp");
}
    class Workout {
      public $id;
      public $author;
      public $workout;
      public $des;


      public function __construct($id, $author, $workout, $des) {
        $this->id = $id;
        $this->author = $author;
        $this->workout = $workout;
        $this->des = $des;

      }
    }

    class Workouts {
      static function all(){
        $workouts = array();

        $results = pg_query("SELECT * FROM workouts ORDER by id ASC");

        $row_object = pg_fetch_object($results);
        while($row_object){
          $new_workout = new Workout(
            intval($row_object->id),
            $row_object->author,
            $row_object->workout,
            $row_object->des,
          );
          $workouts[] = $new_workout;
          $row_object = pg_fetch_object($results);
        }
        return $workouts;
      }
      //
      // CREATE
      //
      //
      static function create($workout){
        $query = "INSERT INTO workouts (author, workout, des) VALUES ($1, $2, $3)";
        $query_params = array($workout->author, $workout->workout, $workout->des);
        pg_query_params($query, $query_params);
        return self::all();
      }
      //
      // UPDATE
      //
      static function update($updated_workout){
        $query = "UPDATE workouts SET author = $1, workout = $2, des = $3 WHERE id = $4";
        $query_params = array($updated_workout->author, $updated_workout->workout, $updated_workout->des, $updated_workout->id);
        $result = pg_query_params($query, $query_params);
        return self::all();
      }
      //
      // DELETE
      //
      static function delete($id){
        $query = "DELETE FROM workouts WHERE id = $1";
        $query_params = array($id);
        $result = pg_query_params($query, $query_params);
        return self::all();
      }
    }
 ?>
