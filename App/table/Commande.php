<?php

namespace App\table;

/**
 * summary
 */
class Commande extends Table
{
    /**
     * summary
     */
    public static function getCommandes(){

        echo json_encode(
            self::query("SELECT 
                users.id as userId,
                users.name,
                users.surname,
                users.email,
                users.tel,
                articles.id as articlesId,
                articles.title,
                articles.slug,
                articles.img,
                articles.price,
                articles.qtt,
                articles.description,
                articles.showPrice,
                articles.isSoftware,
                category.category_name,
                commande.user_solved,
                commande.reverse,
                commande.admin_solved,
                commande.qtt as commandeQtt
                FROM commande
                INNER JOIN users
                ON commande.user_id = users.id
                INNER JOIN articles
                ON commande.post_id = articles.id
                INNER JOIN category
                ON articles.category_id = category.id
                WHERE user_solved = 1
            ")
        );

    }

    public static function setCommande(){

        $post_id = $_POST['post_id'];
        $users_id = $_POST['user_id'];
        $qtt = $_POST['qtt'];

        self::save("INSERT INTO commande(user_id, post_id, qtt) VALUES(?,?,?)",[$users_id, $post_id, $qtt]);

        self::getCommande();
    }

    public static function getCommande(){

        $users_id = $_POST["user_id"];
        echo json_encode(self::query("SELECT
        commande.id, 
        articles.id as pId,
        users.id as userId,
        users.name,
        users.surname,
        users.email,
        users.tel,
        articles.id as articlesId,
        articles.title,
        articles.slug,
        articles.img,
        articles.price,
        articles.qtt,
        articles.description,
        articles.showPrice,
        articles.isSoftware,
        category.category_name,
        commande.user_solved,
        commande.reverse,
        commande.admin_solved,
        commande.qtt as commandeQtt
        FROM commande
        INNER JOIN users
        ON commande.user_id = users.id
        INNER JOIN articles
        ON commande.post_id = articles.id
        INNER JOIN category
        ON articles.category_id = category.id 
        WHERE user_solved = 0 
        AND user_id = $users_id"));

    }

}
