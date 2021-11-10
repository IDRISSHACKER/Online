<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');  
header("Access-Control-Allow-Methods: *");

define("ROOT", dirname(__DIR__));
require ROOT.'/'.'App/autoload.php';
autoload::register();

use App\Database;
use App\Config;
use App\table\Users;
use App\table\Home;
use App\table\Article;
use App\table\Avis;
use App\table\Categorie;
use App\table\Image;
use App\table\Slider;
use App\table\Commande;
use App\table\ChartSale;


$page = "";

if (!empty($_GET["page"])) {

  $page = $_GET["page"];

}else{

  $page = "home/";

}

if($page === "home/" OR $page === "home"){

	var_dump($_SESSION);

}if($page === "ses/" OR $page === "ses"){

	//

}else if($page === "user/" OR $page === "user"){
	$user = Users::getUser();
	echo json_encode($user);

}else if($page === "users/" OR $page === "users"){

	Users::getUsers();

}else if($page === "setUser/" OR $page === "setUser"){

	$user = Users::setUser();
	echo json_encode($user);

}else if($page === "removeUser/" OR $page === "removeUser"){

	Users::removeUser();

}else if($page === "connexion/" OR $page === "connexion"){

	$email = htmlspecialchars($_POST['email']);
	$infos = Users::connexion();
	if($infos["code"] === 1){
		$_SESSION['user'] = $infos['data'];
	}
	echo json_encode($infos);


}else if($page === "appInfos/" OR $page === "appInfos"){

	$infos = Config::init()->getAll();
	echo json_encode($infos);

}else if($page === "articles/" OR $page === "articles"){

	echo json_encode(Article::get_articles());

}else if($page === "article/" OR $page === "article"){

	echo json_encode(Article::get_article()[0]);

}else if($page === "articleLikeCtg/" OR $page === "articleLikeCtg"){

	echo json_encode(Article::getArticleLikeCtg());

}else if($page === "categories/" OR $page === "categories"){

	echo json_encode(Categorie::getCategories());

}else if($page === "setArticle/" OR $page === "setArticle"){

	Article::setArticle();

}else if($page === "setImage/" OR $page === "setImage"){

	Image::setImage();

}else if($page === "setCategory/" OR $page === "setCategory"){

	Categorie::setCategory();

}else if($page === "removeCtg/" OR $page === "removeCtg"){

	Categorie::removeCtg();

}else if($page === "setAvi/" OR $page === "setAvi"){

	Avis::setAvi();

}else if($page === "getAvis/" OR $page === "getAvis"){

	Avis::getAvis();

}else if($page === "updateAvi/" OR $page === "updateAvi"){

	Avis::updateAvi();

}else if($page === "setSlide/" OR $page === "setSlide"){

	Slider::setSlide();

}else if($page === "sliders/" OR $page === "sliders"){

	Slider::getSlide();
	
}else if($page === "mostNote/" OR $page === "mostNote"){

	Article::getArticleLikeNote();

}else if($page === "updateCategory/" OR $page === "updateCategory"){

	Categorie::editCategory();

}else if($page === "removeSlide/" OR $page === "removeSlide"){

	Slider::removeSlide();

}else if($page === "updateSlide/" OR $page === "updateSlide"){

	Slider::updateSlide();

}else if($page === "removeArticle/" OR $page === "removeArticle"){

	Article::removeArticle();

}else if($page === "updateArticle/" OR $page === "updateArticle"){

	Article::updateArticle();

}else if($page === "getCommandes/" OR $page === "getCommande"){

	Commande::getCommandes();

}else if($page === "statSale/" OR $page === "statSale"){

	ChartSale::chartSaleByDay();
}
