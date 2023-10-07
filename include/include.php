<?php
require_once('database.php');
class backend
{
    public function doRegister($first_name, $last_name, $email, $password, $cpassword)
    {
        return self::register($first_name, $last_name, $email, $password, $cpassword);
    }

    public function doLogin($email, $password)
    {
        return self::login($email, $password);
    }

    public function lockUser($attempt, $email)
    {
        return self::locked($attempt, $email);
    }

    private function checker($first_name, $last_name, $email, $password, $cpassword)
    {
        if (
            $first_name != "" && $last_name != "" && $email != "" && $password != "" && $cpassword != ""
        ) {
            return true;
        } else {
            return false;
        }
    }
    private function checkUser($username, $password)
    {
        if ($username != "" && $password != "") {
            return true;
        } else {
            return false;
        }
    }

    private function validation($status, $lock, $password, $tmp)
    {
        if ($status == 1 && $lock == 0 && md5($password) == $tmp) {
            //admin
            return 1;
        } else if ($status == 0 && $lock == 0 &&  md5($password) == $tmp) {
            //user
            return 0;
        } else if ($status == 0 && $lock == 1 &&  md5($password) == $tmp) {
            //lock user
            return 2;
        } else {
            return false;
        }
    }

    private function register($first_name, $last_name, $email, $password, $cpassword)
    {
        try {
            if ($this->checker($first_name, $last_name, $email, $password, $cpassword)) {
                $conn = new database();
                if ($conn->getStatus()) {
                    $stmt = $conn->getCon()->prepare($this->registerQuery());
                    $stmt->execute(array($first_name, $last_name, $email, md5($password), md5($cpassword), 0, 0));
                    $res = $stmt->fetch();
                    if (!$res) {
                        $conn->dbClose();
                        return 200;
                    } else {
                        $conn->dbClose();
                        return 404;
                    }
                } else {
                    return 403;
                }
            } else {
                return 403;
            }
        } catch (PDOException $th) {
            return $th;
        }
    }
    private function login($email, $password)
    {
        try {
            if ($this->checkUser($email, $password)) {
                $conn = new database();
                $tmp = md5($password);
                if ($conn->getStatus()) {
                    $stmt = $conn->getCon()->prepare($this->loginQuery());
                    $stmt->execute(array($email, $tmp));
                    $result = $stmt->fetch();
                    $status = null;
                    $lock = null;
                    if ($result > 0) {
                        $_SESSION['username'] = $email;
                        $_SESSION['password'] = $tmp;
                        $status = $result['role'];
                        $lock = $result['isLocked'];
                        $conn->dbClose();
                        return $this->validation($status, $lock, $password, $tmp);
                    } else {
                        return 404;
                    }
                } else {
                    return 403;
                }
            } else {
                return 403;
            }
        } catch (PDOException $th) {
            return $th;
        }
    }

    private function locked($attempt, $email)
    {
        try {
            $conn = new database();
            if ($conn->getStatus()) {
                $stmt = $conn->getCon()->prepare($this->isLockQuery());
                $stmt->execute(array($attempt, $email));
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if (!$result) {
                    $conn->dbClose();
                    return 1;
                } else {
                    $conn->dbClose();
                    return 0;
                }
            }
        } catch (PDOException $th) {
            return $th;
        }
    }

    private function getId()
    {
        try {
            $db = new database();
            if ($db->getStatus()) {
                $stmt = $db->getCon()->prepare($this->loginQuery());
                $stmt->execute(array($_SESSION['username'], $_SESSION['password']));
                $tmp = null;
                $row = $stmt->fetch();
                if ($row > 0) {
                    $tmp = $row['user_id'];
                }
                return $tmp;
            }
        } catch (PDOException $th) {
            echo $th;
        }
    }

    private function registerQuery()
    {
        return "INSERT INTO `users`(`first_name`, `last_name`, `email`, `password`, `confirm_ password`, `isLocked`, `role`) VALUES (?,?,?,?,?,?,?)";
    }
    private function loginQuery()
    {
        return "SELECT * FROM users WHERE email = ? AND `password` = ?";
    }
    private function isLockQuery()
    {
        return "UPDATE users SET `isLocked` = ? WHERE `email` = ?";
    }
}