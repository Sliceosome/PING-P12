-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 22 juin 2022 à 16:11
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `contour_evaluation`
--

-- --------------------------------------------------------

--
-- Structure de la table `contour`
--

CREATE TABLE `contour` (
  `id_contour` int(10) NOT NULL,
  `folder_path` varchar(1000) NOT NULL,
  `manufacturer_name` varchar(50) NOT NULL,
  `is_handcrafted` tinyint(1) DEFAULT NULL,
  `bonus` int(10) NOT NULL,
  `malus` int(10) NOT NULL,
  `id_organ` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contour`
--

INSERT INTO `contour` (`id_contour`, `folder_path`, `manufacturer_name`, `is_handcrafted`, `bonus`, `malus`, `id_organ`) VALUES
(1, './DATABASE/BrachialPlexus_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 1),
(2, './DATABASE/BrachialPlexus_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 1),
(3, './DATABASE/BrachialPlexus_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 2),
(4, './DATABASE/BrachialPlexus_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 2),
(5, './DATABASE/Brain/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 3),
(6, './DATABASE/Brain/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 3),
(7, './DATABASE/BrainStem/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 4),
(8, './DATABASE/BrainStem/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 4),
(9, './DATABASE/Chiasm/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 5),
(10, './DATABASE/Chiasm/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 5),
(11, './DATABASE/Cochlea_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 6),
(12, './DATABASE/Cochlea_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 6),
(13, './DATABASE/Cochlea_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 7),
(14, './DATABASE/Cochlea_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 7),
(15, './DATABASE/Constrictors/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 8),
(16, './DATABASE/Constrictors/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 8),
(17, './DATABASE/CTV_NECK_LEVEL1B_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 9),
(18, './DATABASE/CTV_NECK_LEVEL1B_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 9),
(19, './DATABASE/CTV_NECK_LEVEL1B_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 10),
(20, './DATABASE/CTV_NECK_LEVEL1B_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 10),
(21, './DATABASE/CTV_NECK_LEVEL5_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 11),
(22, './DATABASE/CTV_NECK_LEVEL5_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 11),
(23, './DATABASE/Esophagus/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 12),
(24, './DATABASE/Esophagus/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 12);

-- --------------------------------------------------------

--
-- Structure de la table `grade`
--

CREATE TABLE `grade` (
  `id_grade` int(10) NOT NULL,
  `value` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `id_contour` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `organ`
--

CREATE TABLE `organ` (
  `id_organ` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `organ`
--

INSERT INTO `organ` (`id_organ`, `name`) VALUES
(1, 'BrachialPlexus_L'),
(2, 'BrachialPlexus_R'),
(3, 'Brain'),
(4, 'BrainStem'),
(5, 'Chiasm'),
(6, 'Cochlea_L'),
(7, 'Cochlea_R'),
(8, 'Constrictors'),
(9, 'CTV_NECK_LEVEL1B_L'),
(10, 'CTV_NECK_LEVEL1B_R'),
(11, 'CTV_NECK_LEVEL5_L'),
(12, 'Esophagus');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `iv` varchar(255) NOT NULL,
  `role` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `iv`, `role`) VALUES
(0, 'gneu', 'gnau@gmail.com', 'a4b879d7104924f39b7aac', '20788ecb56797944d469f110607fd56c', '');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contour`
--
ALTER TABLE `contour`
  ADD PRIMARY KEY (`id_contour`),
  ADD UNIQUE KEY `folder_path` (`folder_path`) USING HASH;

--
-- Index pour la table `grade`
--
ALTER TABLE `grade`
  ADD PRIMARY KEY (`id_grade`);

--
-- Index pour la table `organ`
--
ALTER TABLE `organ`
  ADD PRIMARY KEY (`id_organ`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password` (`password`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contour`
--
ALTER TABLE `contour`
  MODIFY `id_contour` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `grade`
--
ALTER TABLE `grade`
  MODIFY `id_grade` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `organ`
--
ALTER TABLE `organ`
  MODIFY `id_organ` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
