<?php

namespace App\table;

/**
 * summary
 */
class Categorie extends Table
{
    /**
     * summary
     */
   public static function getCategories(){

    return self::query("SELECT * FROM category ORDER BY id DESC");

   }

   public static function setCategory(){

    $ctg_title  = $_POST['title'];
    $ctg_desc   = $_POST['description'];
    $ctg_img    = $_POST['img'];

    if(self::save("INSERT INTO category(category_name, category_desc, category_img) VALUES(?,?,?)", [$ctg_title, $ctg_desc, $ctg_img])){

      echo json_encode(["success"]);

    }else{

      echo json_encode(["error"]);

    }


   }

}
