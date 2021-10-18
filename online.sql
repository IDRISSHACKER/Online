-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 08 oct. 2021 à 03:31
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_articlescategoryRESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8monlineonlinecategoryfilesb4 */;

--
-- Base de données :  `online`
--

-- --------------------------------------------------------

--
-- Structure de la table `articles`
--

DROP TABLE IF EXISTS `articles`;
CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(250) NOT NULL,
  `img` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `qtt` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`,`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `img`, `price`, `qtt`, `category_id`, `description`, `deleted`, `created_at`) VALUES
(1, 'lenovo 8go de ram 512 GO ssd, ecran 16 pouces, super batery 8h\r\n', 'lenovo-8go-de-ram', 'default.png', 200000, 5, 1, 'lenovo 8go de ram 250 GO ssd, ecran 15 pouces, super batery', 0, '2021-10-03 13:05:06'),
(2, 'HP Spectre 24\", tracpad, ecran retine 300 hz, Nvidia Gforce RTX 3060', 'HP-Spectre-13', 'default2.png', 600000, 8, 1, 'HP Spectre 13, tracpad, ecran retine 300 hz, Nvidia Gforce RTX 3060', 0, '2021-10-03 17:26:22');

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  `category_desc` text DEFAULT NULL,
  `category_img` varchar(255) DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `category_name`, `category_desc`, `category_img`, `deleted`) VALUES
(1, 'Hight Tech', 'les produits hightech haut de gamme', 'default.png', 0);

-- --------------------------------------------------------

--
-- Structure de la table `files`
--

DROP TABLE IF EXISTS `files`;
CREATE TABLE IF NOT EXISTS `files` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file` varchar(255) NOT NULL,
  `file_type` varchar(255) NOT NULL,
  `article_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `files`
--

INSERT INTO `files` (`id`, `file`, `file_type`, `article_id`) VALUES
(1, 'demo.png', 'img', 1),
(2, 'demo2.jpg', 'img', 1);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'admin'),
(2, 'customer'),
(3, 'employe');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `role_id` int(11) NOT NULL DEFAULT 2,
  `password` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `pseudo`, `email`, `tel`, `deleted`, `role_id`, `password`, `created_at`, `updated_at`) VALUES
(1, 'idriss', 'hacker', 'idriss-hacker', 'idrisscoder@gmail.com', '693342860', 0, 1, '$2y$10$AeseaNWU2Et1/wCbY3Rcgubxs8Yy9nbkpo0GSBrqE.L6z6HSZr44O', '2021-09-19 21:44:41', '0000-00-00 00:00:00'),
(2, 'zakou', 'hacker', 'coder', 'zakou@gmail.com', NULL, 0, 3, '1234', '2021-09-19 21:37:47', '0000-00-00 00:00:00'),
(3, 'bakam', 'junior', 'madara', 'bakamjunior@gmail.com', NULL, 0, 2, '1234', '2021-09-19 21:37:47', '0000-00-00 00:00:00'),
(22, 'idriss2', 'hacker2', '', 'hacker@gmail.com', '', 0, 2, '$2y$10$bHCwKPyp6.LwgG4tGmlB3O.MDAIzMkFv98RzpZ9HKcv/peW/09yQ.', '2021-09-21 12:56:44', '0000-00-00 00:00:00'),
(19, 'tchakoua', 'frank', '', 'frank@gmail.com', '', 0, 2, '$2y$10$a7fzoUQkjYqfJi9GLtFD7Om8fjyVTC2Rpr8EiALy0icjQ2BKmlZTa', '2021-09-21 12:17:55', '0000-00-00 00:00:00'),
(23, 'watch', 'watch', '', 'watch@gmail.fr', '', 0, 2, '$2y$10$AeseaNWU2Et1/wCbY3Rcgubxs8Yy9nbkpo0GSBrqE.L6z6HSZr44O', '2021-10-03 10:54:48', '2021-10-03 10:54:48'),
(17, 'wess', 'wess', '', 'wess@gmail.com', '', 0, 2, '$2y$10$e6bDQaMvaJrejvE8rSygqu2buuRPMf1Qa6jCkGUJSNjK800P2TMM2', '2021-09-21 03:01:41', '0000-00-00 00:00:00'),
(16, 'tchaha', 'claude', '', 'claude@gmail.com', '', 0, 2, '$2y$10$U3qg9p/E7h5Jc2d2cf5MXuoXgT1E7PTCTQbL9pTZCD9RSQv6RCgs.', '2021-09-21 02:53:12', '0000-00-00 00:00:00'),
(13, 'idriss', 'hacker', '', 'Michel@gm.ft', '', 0, 2, '$2y$10$m/GxIOxeTZql7tP7mI.gEe15r1KhKRk59I7aO1AJbYzHI5TNgE2/W', '2021-09-21 01:35:03', '0000-00-00 00:00:00'),
(15, 'idriss', 'hacker', '', 'Michel2@gm.ft', '', 0, 2, '$2y$10$s6YmW/IZys3zxoGJolyfLOPIEKAffuqAVy/tv6SEmVV1inc.f3lL.', '2021-09-21 02:05:02', '0000-00-00 00:00:00');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
