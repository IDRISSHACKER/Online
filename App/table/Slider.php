<?php

namespace App\table;

/**
 * summary
 */
class Slider extends Table
{

    public static function setSlide(){
        $title = $_POST['title'];
        $description = $_POST['description'];
        $image = $_POST['image'];
        $post_id = $_POST['post_id'];

        if(self::save("INSERT INTO 
            Slider(post_id, img, title, description) 
            VALUES(?,?,?,?)",
        [$post_id, $image, $title, $description]
       )){

        $last_slider = self::query("SELECT * FROM slider ORDER BY id DESC LIMIT 1")[0];

        echo json_encode($last_slider);

       }

    }

    public static function getSlide(){
        $sliders = self::query("SELECT 
        slider.id, slider.title as stitle, slider.img, slider.description, 
        articles.id as pId, articles.title, articles.slug 
        FROM slider 
        INNER JOIN articles 
        ON  slider.post_id = articles.id 
        ORDER BY id DESC 
        LIMIT 10");

       echo json_encode($sliders);
    }
    

}