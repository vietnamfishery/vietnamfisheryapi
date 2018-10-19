-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2018 at 08:33 AM
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
-- Table structure for table `ponds`
--

CREATE TABLE `ponds` (
  `pondId` bigint(20) NOT NULL,
  `pondUUId` char(36) COLLATE utf8_unicode_ci NOT NULL,
  `userId` bigint(20) NOT NULL,
  `pondName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pondArea` float NOT NULL,
  `pondCreatedDate` datetime NOT NULL,
  `pondDepth` float NOT NULL,
  `createCost` float NOT NULL,
  `status` int(1) NOT NULL DEFAULT '0',
  `images` text COLLATE utf8_unicode_ci,
  `pondLatitude` double DEFAULT NULL,
  `pondLongitude` double DEFAULT NULL,
  `createdBy` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdDate` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedBy` char(36) COLLATE utf8_unicode_ci DEFAULT NULL,
  `updatedDate` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `ponds`
--

INSERT INTO `ponds` (`pondId`, `pondUUId`, `userId`, `pondName`, `pondArea`, `pondCreatedDate`, `pondDepth`, `createCost`, `status`, `images`, `pondLatitude`, `pondLongitude`, `createdBy`, `createdDate`, `updatedBy`, `updatedDate`, `isDeleted`) VALUES
(15, '6a9d2026-82f3-4e8a-a138-5da9fcdc6dfd', 102, 'Tôm thẻ chân trắng', 45.8, '2018-10-10 17:00:00', 5.2, 20000000, 0, '1EVRh5NePZkOBxfKFDAD1RZ3AjHSWJ12W', 10.365568290116494, 105.76675425232156, NULL, '2018-10-18 06:32:40', NULL, '2018-10-18 06:32:40', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ponds`
--
ALTER TABLE `ponds`
  ADD PRIMARY KEY (`pondId`),
  ADD UNIQUE KEY `pondUUId` (`pondUUId`),
  ADD KEY `FK_RELATIONSHIP_2` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ponds`
--
ALTER TABLE `ponds`
  MODIFY `pondId` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `ponds`
--
ALTER TABLE `ponds`
  ADD CONSTRAINT `FK_RELATIONSHIP_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
