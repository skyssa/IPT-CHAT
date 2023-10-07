<?php
require_once('server.php');
class database
{
    private $server = server;
    private $user = username;
    private $pass = password;
    private $database = database;
    private $status;
    private $conn;

    function __construct()
    {
        $this->status = false;
        $this->conn = $this->connect();
    }

    private function connect()
    {
        try {
            $con = new PDO(
                "mysql:host=$this->server;dbname=" . $this->database,
                    $this->user,
                    $this->pass
            );
            $con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->status = true;
            return $con;
        } catch (PDOException $th) {
            echo $th;
        }
    }

    public function getStatus()
    {
        return $this->status;
    }
    public function getCon()
    {
        return $this->conn;
    }
    public function dbClose()
    {
        return $this->conn = null;
    }
}
?>