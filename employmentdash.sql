-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2023 at 08:04 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employmentdash`
--

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `ID` int(11) NOT NULL,
  `Position` varchar(255) NOT NULL,
  `Description` text NOT NULL,
  `Offer` int(11) NOT NULL,
  `MaxCandidateNumber` int(11) NOT NULL,
  `Qualification` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_qualification`
--

CREATE TABLE `job_qualification` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `qualification_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_requests`
--

CREATE TABLE `job_requests` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `status` enum('pending','Accepted','Rejected') NOT NULL DEFAULT 'pending',
  `requested_Date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

CREATE TABLE `qualification` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('Active','inActive') NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> for Applicant\r\n1 -> for Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_job`
--

CREATE TABLE `user_job` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `job_qualification`
--
ALTER TABLE `job_qualification`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `job_ID` (`job_ID`),
  ADD KEY `qualification_ID` (`qualification_ID`);

--
-- Indexes for table `job_requests`
--
ALTER TABLE `job_requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `request_user` (`user_ID`),
  ADD KEY `request_job` (`job_ID`);

--
-- Indexes for table `qualification`
--
ALTER TABLE `qualification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_job`
--
ALTER TABLE `user_job`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `job_ID_user` (`job_ID`),
  ADD KEY `user_ID` (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `job_qualification`
--
ALTER TABLE `job_qualification`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_requests`
--
ALTER TABLE `job_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `qualification`
--
ALTER TABLE `qualification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202002;

--
-- AUTO_INCREMENT for table `user_job`
--
ALTER TABLE `user_job`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `job_qualification`
--
ALTER TABLE `job_qualification`
  ADD CONSTRAINT `job_ID` FOREIGN KEY (`job_ID`) REFERENCES `job` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `qualification_ID` FOREIGN KEY (`qualification_ID`) REFERENCES `qualification` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `job_requests`
--
ALTER TABLE `job_requests`
  ADD CONSTRAINT `request_job` FOREIGN KEY (`job_ID`) REFERENCES `job` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `request_user` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_job`
--
ALTER TABLE `user_job`
  ADD CONSTRAINT `job_ID_user` FOREIGN KEY (`job_ID`) REFERENCES `job` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_ID` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
