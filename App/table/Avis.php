<?php

namespace App\table;

/**
 * summary
 */
class Avis extends Table
{

    public static function setAvi(){

        $user_id = 1;
        $title = $_POST["title"];
        $note = $_POST["note"];
        $comment = $_POST["comment"];

        if(!empty($user_id) && !empty($note) && !empty($comment)){

            if(self::save("INSERT INTO avis(user_id, title, note, comment) VALUES(?,?,?,?)",[$user_id, $title, $note, $comment])){

                echo json_encode('success');

            }else{

                echo json_encode("error");

            }
        }else{

            echo json_encode("error");
        };


    }


    public static function getAvis(){

        $avis = self::query("SELECT users.id, avis.note, avis.comment FROM avis LEFT JOIN users ON id = avis.user_id");
        
        if($avis){

            return json_encode($avis);

        }else{

            return json_encode([]);
        }
    }

}