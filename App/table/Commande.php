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
                commande.admin_solved,
                commande.qtt as commandeQtt
                FROM commande
                INNER JOIN users
                ON commande.user_id = users.id
                INNER JOIN articles
                ON commande.post_id = articles.id
                INNER JOIN category
                ON articles.category_id = category.id
            ")
        );

    }

}
