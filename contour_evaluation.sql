-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 23 juin 2022 à 01:18
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
(1, 'C:DATABASEBladder/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 1),
(2, 'C:DATABASEBladder/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 1),
(3, 'C:DATABASEBone_Ilium_L/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 2),
(4, 'C:DATABASEBone_Ilium_L/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 2),
(5, 'C:DATABASEBone_Ilium_R/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 3),
(6, 'C:DATABASEBone_Ilium_R/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 3),
(7, 'C:DATABASEBone_Mandible/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 4),
(8, 'C:DATABASEBone_Mandible/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 4),
(9, 'C:DATABASEBrachialPlex_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 5),
(10, 'C:DATABASEBrachialPlex_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 5),
(11, 'C:DATABASEBrachialPlex_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 6),
(12, 'C:DATABASEBrachialPlex_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 6),
(13, 'C:DATABASEBrain/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 7),
(14, 'C:DATABASEBrain/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 7),
(15, 'C:DATABASEBrainstem/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 8),
(16, 'C:DATABASEBrainstem/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 8),
(17, 'C:DATABASECanal_Anal/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 9),
(18, 'C:DATABASECanal_Anal/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 9),
(19, 'C:DATABASECavity_Oral/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 10),
(20, 'C:DATABASECavity_Oral/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 10),
(21, 'C:DATABASECochlea_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 11),
(22, 'C:DATABASECochlea_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 11),
(23, 'C:DATABASECochlea_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 12),
(24, 'C:DATABASECochlea_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 12),
(25, 'C:DATABASEEsophagus/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 13),
(26, 'C:DATABASEEsophagus/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 13),
(27, 'C:DATABASEEye_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 14),
(28, 'C:DATABASEEye_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 14),
(29, 'C:DATABASEEye_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 15),
(30, 'C:DATABASEEye_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 15),
(31, 'C:DATABASEFemur_Head_L/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 16),
(32, 'C:DATABASEFemur_Head_L/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 16),
(33, 'C:DATABASEFemur_Head_R/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 17),
(34, 'C:DATABASEFemur_Head_R/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 17),
(35, 'C:DATABASEGlnd_Thyroid/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 18),
(36, 'C:DATABASEGlnd_Thyroid/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 18),
(37, 'C:DATABASELarynx/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 19),
(38, 'C:DATABASELarynx/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 19),
(39, 'C:DATABASELens_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 20),
(40, 'C:DATABASELens_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 20),
(41, 'C:DATABASELips/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 21),
(42, 'C:DATABASELips/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 21),
(43, 'C:DATABASEOpticChiasm/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 22),
(44, 'C:DATABASEOpticChiasm/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 22),
(45, 'C:DATABASEOpticNrv_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 23),
(46, 'C:DATABASEOpticNrv_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 23),
(47, 'C:DATABASEOpticNrv_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 24),
(48, 'C:DATABASEOpticNrv_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 24),
(49, 'C:DATABASEParotid_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 25),
(50, 'C:DATABASEParotid_L/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 25),
(51, 'C:DATABASEParotid_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 26),
(52, 'C:DATABASEParotid_R/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 26),
(53, 'C:DATABASEPenile_Bulb/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 27),
(54, 'C:DATABASEPenile_Bulb/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 27),
(55, 'C:DATABASEPituitary/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 28),
(56, 'C:DATABASEPituitary/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 28),
(57, 'C:DATABASERectum/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 29),
(58, 'C:DATABASERectum/$$$88726584_1.2.840.113704.7.1.0.182231177252224.1648735459.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 29),
(59, 'C:DATABASETrachea/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/LimbusAIInc', 'LimbusAIInc', 0, 0, 0, 30),
(60, 'C:DATABASETrachea/$$$88551464_1.2.840.113704.7.1.0.18317622184172152.1648135228.1/TheraPanacea', 'TheraPanacea', 1, 0, 0, 30);

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
(1, 'Bladder'),
(2, 'Bone_Ilium_L'),
(3, 'Bone_Ilium_R'),
(4, 'Bone_Mandible'),
(5, 'BrachialPlex_L'),
(6, 'BrachialPlex_R'),
(7, 'Brain'),
(8, 'Brainstem'),
(9, 'Canal_Anal'),
(10, 'Cavity_Oral'),
(11, 'Cochlea_L'),
(12, 'Cochlea_R'),
(13, 'Esophagus'),
(14, 'Eye_L'),
(15, 'Eye_R'),
(16, 'Femur_Head_L'),
(17, 'Femur_Head_R'),
(18, 'Glnd_Thyroid'),
(19, 'Larynx'),
(20, 'Lens_L'),
(21, 'Lips'),
(22, 'OpticChiasm'),
(23, 'OpticNrv_L'),
(24, 'OpticNrv_R'),
(25, 'Parotid_L'),
(26, 'Parotid_R'),
(27, 'Penile_Bulb'),
(28, 'Pituitary'),
(29, 'Rectum'),
(30, 'Trachea');

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
  MODIFY `id_contour` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT pour la table `grade`
--
ALTER TABLE `grade`
  MODIFY `id_grade` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `organ`
--
ALTER TABLE `organ`
  MODIFY `id_organ` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
