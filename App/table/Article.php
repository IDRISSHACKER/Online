<?php

namespace App\Table;

/**
 * summary
 */

use App\App;


class Article extends Table
{

    public static function get_articles()
    {
        return self::query("SELECT articles.id, articles.title, articles.slug, articles.img, articles.qtt, articles.price, articles.description, category.category_name, category.id as ctgId, articles.created_at FROM category INNER JOIN articles ON category.id = articles.category_id ORDER BY id DESC");
    }

    public static function get_article()
    {
        $id = $_GET['id'];

        return self::query("SELECT articles.id, articles.title, articles.slug, articles.img, articles.qtt, articles.price, articles.description, category.category_name, articles.category_id, articles.created_at FROM category INNER JOIN articles ON category.id = category_id WHERE articles.id = ?", [$id]);
    }

    public function getImgForArticle()
    {
        $post_id = $_POST['id'];

        if (isset($post_id) and !empty($post_id)) {

            return self::query("SELECT files.id, files.file, files.file_type FROM files WHERE files.article_id = $post_id ");
        } else {
            return [];
        }
    }

    public static function getArticleLikeCtg()
    {
        $ctg_id = $_POST['ctg_id'];
        $id = $_POST['post_id'];

        if (isset($ctg_id) and !empty($ctg_id)) {

            return self::query("SELECT articles.id, articles.title, articles.slug, articles.img, articles.price, articles.qtt, articles.description, category.category_name FROM articles INNER JOIN category ON category.id = articles.category_id WHERE category.id = $ctg_id AND articles.id != $id");
        } else {
            return [];
        }
    }

    public static function setArticle(){

        $title = $_POST['title'];
        $slug = $_POST['slug'];
        $img = $_POST['img'];
        $price = $_POST['price'];
        $qtt = $_POST['qtt'];
        $category_id = $_POST['category_id'];
        $description = $_POST['description'];

        if(self::save("INSERT INTO  articles(title, slug, img, price, qtt, category_id, description) VALUES(?,?,?,?,?,?,?)",[$title, $slug, $img, $price, $qtt, $category_id, $description])){
            return json_decode('success');
        }else{
            echo json_encode("error");
        }
    }
}
