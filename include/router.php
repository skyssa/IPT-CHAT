<?php
session_start();
require_once('backend.php');
if (isset($_POST['choice'])) {
    switch ($_POST['choice']) {
        case 'register':
           
            break;
        case 'login':
          
            break;
        case 'locked':
         
            break;
        case 'logout':
            session_unset();
            session_destroy();
            echo "200";
            break;
        default:
            # code...
            break;
    }
}
?>