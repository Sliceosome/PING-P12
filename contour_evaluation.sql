-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 09 juin 2022 à 19:00
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
  `path` varchar(50) NOT NULL,
  `scan_path` varchar(50) NOT NULL,
  `id_organ` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `contour`
--

INSERT INTO `contour` (`id_contour`, `path`, `scan_path`, `id_organ`) VALUES
(1, './Dicom_Files/Contours/AnalCanal/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 1),
(2, './Dicom_Files/Contours/AnalCanal/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 1),
(3, './Dicom_Files/Contours/BoneIliumL/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 2),
(4, './Dicom_Files/Contours/BoneIliumL/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 2),
(5, './Dicom_Files/Contours/BoneIliumR/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 3),
(6, './Dicom_Files/Contours/BoneIliumR/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 3),
(7, './Dicom_Files/Contours/BrachialPlexusL/Scan_3/1.dc', './Dicom_Files/Scans/Scan_3/', 4),
(8, './Dicom_Files/Contours/BrachialPlexusL/Scan_3/2.dc', './Dicom_Files/Scans/Scan_3/', 4),
(9, './Dicom_Files/Contours/BrachialPlexusR/Scan_3/1.dc', './Dicom_Files/Scans/Scan_3/', 5),
(10, './Dicom_Files/Contours/BrachialPlexusR/Scan_3/2.dc', './Dicom_Files/Scans/Scan_3/', 5),
(11, './Dicom_Files/Contours/Brain/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 6),
(12, './Dicom_Files/Contours/Brain/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 6),
(13, './Dicom_Files/Contours/BrainStem/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 7),
(14, './Dicom_Files/Contours/BrainStem/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 7),
(15, './Dicom_Files/Contours/Chiasm/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 8),
(16, './Dicom_Files/Contours/Chiasm/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 8),
(17, './Dicom_Files/Contours/CochleaL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 9),
(18, './Dicom_Files/Contours/CochleaL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 9),
(19, './Dicom_Files/Contours/CochleaR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 10),
(20, './Dicom_Files/Contours/CochleaR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 10),
(21, './Dicom_Files/Contours/Esophagus/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 11),
(22, './Dicom_Files/Contours/Esophagus/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 11),
(23, './Dicom_Files/Contours/FermoralHeadL/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 12),
(24, './Dicom_Files/Contours/FermoralHeadL/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 12),
(25, './Dicom_Files/Contours/FermoralHeadR/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 13),
(26, './Dicom_Files/Contours/FermoralHeadR/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 13),
(27, './Dicom_Files/Contours/Larynx/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 14),
(28, './Dicom_Files/Contours/Larynx/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 14),
(29, './Dicom_Files/Contours/LensL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 15),
(30, './Dicom_Files/Contours/LensL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 15),
(31, './Dicom_Files/Contours/LensR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 16),
(32, './Dicom_Files/Contours/LensR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 16),
(33, './Dicom_Files/Contours/Lips/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 17),
(34, './Dicom_Files/Contours/Lips/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 17),
(35, './Dicom_Files/Contours/Mandible/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 18),
(36, './Dicom_Files/Contours/Mandible/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 18),
(37, './Dicom_Files/Contours/OpticNerveL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 19),
(38, './Dicom_Files/Contours/OpticNerveL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 19),
(39, './Dicom_Files/Contours/OpticNerveR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 20),
(40, './Dicom_Files/Contours/OpticNerveR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 20),
(41, './Dicom_Files/Contours/OralCavity/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 21),
(42, './Dicom_Files/Contours/OralCavity/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 21),
(43, './Dicom_Files/Contours/ParotidL/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 22),
(44, './Dicom_Files/Contours/ParotidL/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 22),
(45, './Dicom_Files/Contours/ParotidR/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 23),
(46, './Dicom_Files/Contours/ParotidR/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 23),
(47, './Dicom_Files/Contours/PenileBulb/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 24),
(48, './Dicom_Files/Contours/PenileBulb/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 24),
(49, './Dicom_Files/Contours/Pituitary/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 25),
(50, './Dicom_Files/Contours/Pituitary/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 25),
(51, './Dicom_Files/Contours/Rectum/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 26),
(52, './Dicom_Files/Contours/Rectum/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 26),
(53, './Dicom_Files/Contours/Thyroid/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 27),
(54, './Dicom_Files/Contours/Thyroid/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 27),
(55, './Dicom_Files/Contours/Trachea/Scan_3/1.dcm', './Dicom_Files/Scans/Scan_3/', 28),
(56, './Dicom_Files/Contours/Trachea/Scan_3/2.dcm', './Dicom_Files/Scans/Scan_3/', 28),
(57, './Dicom_Files/Contours/Vessie/Scan_4/1.dcm', './Dicom_Files/Scans/Scan_4/', 29),
(58, './Dicom_Files/Contours/Vessie/Scan_4/2.dcm', './Dicom_Files/Scans/Scan_4/', 29);

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
(1, 'AnalCanal'),
(2, 'BoneIliumL'),
(3, 'BoneIliumR'),
(4, 'BrachialPlexusL'),
(5, 'BrachialPlexusR'),
(6, 'Brain'),
(7, 'BrainStem'),
(8, 'Chiasm'),
(9, 'CochleaL'),
(10, 'CochleaR'),
(11, 'Esophagus'),
(12, 'FermoralHeadL'),
(13, 'FermoralHeadR'),
(14, 'Larynx'),
(15, 'LensL'),
(16, 'LensR'),
(17, 'Lips'),
(18, 'Mandible'),
(19, 'OpticNerveL'),
(20, 'OpticNerveR'),
(21, 'OralCavity'),
(22, 'ParotidL'),
(23, 'ParotidR'),
(24, 'PenileBulb'),
(25, 'Pituitary'),
(26, 'Rectum'),
(27, 'Thyroid'),
(28, 'Trachea'),
(29, 'Vessie');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contour`
--
ALTER TABLE `contour`
  ADD PRIMARY KEY (`id_contour`),
  ADD UNIQUE KEY `path` (`path`);

--
-- Index pour la table `organ`
--
ALTER TABLE `organ`
  ADD PRIMARY KEY (`id_organ`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contour`
--
ALTER TABLE `contour`
  MODIFY `id_contour` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT pour la table `organ`
--
ALTER TABLE `organ`
  MODIFY `id_organ` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
