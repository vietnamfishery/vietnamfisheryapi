-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2018 at 12:05 AM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 7.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fisheriesdatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `usingveterinary`
--

CREATE TABLE `usingveterinary` (
  `usingVeterinaryId` bigint(20) NOT NULL,
  `usingVeterinaryUUId` varchar(36) COLLATE utf8_unicode_ci NOT NULL,
  `takeCareId` bigint(20) NOT NULL,
  `materialId` bigint(20) NOT NULL,
  `causesNSymptoms` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `averageSize` float NOT NULL,
  `totalBiomass` float NOT NULL,
  `quantity` float NOT NULL,
  `result` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `latestHarvestDate` int(11) DEFAULT NULL,
  `mentor` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdBy` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `usingveterinary`
--
ALTER TABLE `usingveterinary`
  ADD PRIMARY KEY (`usingVeterinaryId`),
  ADD UNIQUE KEY `usingVeterinaryUUId` (`usingVeterinaryUUId`),
  ADD KEY `FK_uv_to_material` (`materialId`),
  ADD KEY `FK_uv_to_takecare` (`takeCareId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usingveterinary`
--
ALTER TABLE `usingveterinary`
  MODIFY `usingVeterinaryId` bigint(20) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `usingveterinary`
--
ALTER TABLE `usingveterinary`
  ADD CONSTRAINT `FK_uv_to_material` FOREIGN KEY (`materialId`) REFERENCES `materials` (`materialId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_uv_to_takecare` FOREIGN KEY (`takeCareId`) REFERENCES `takecare` (`takeCareId`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
