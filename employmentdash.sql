-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 09, 2023 at 12:13 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
  `MaxCandidateNumber` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`ID`, `Position`, `Description`, `Offer`, `MaxCandidateNumber`) VALUES
(49, 'Full Stack Developer', 'Full Stack Developer + FrontEend Developer + BackEnd Developer', 5000, 1),
(82, 'Doctor', 'Doctor', 50, 27),
(83, 'front end Developer', 'front end Developer', 5000, 11),
(88, 'Poula fffff', 'Poula fffff', 50, 1),
(89, 'Poula fffff', 'Poula fffff', 50, 1),
(92, 'galal', 'galal', 7000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `job_qualification`
--

CREATE TABLE `job_qualification` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `qualification_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_qualification`
--

INSERT INTO `job_qualification` (`ID`, `job_ID`, `qualification_ID`) VALUES
(104, 82, 14),
(108, 49, 9),
(109, 49, 12),
(110, 83, 14),
(111, 83, 9),
(122, 88, 9),
(123, 88, 12),
(124, 88, 14),
(125, 89, 9),
(132, 92, 12),
(133, 92, 14),
(134, 92, 9);

-- --------------------------------------------------------

--
-- Table structure for table `job_requests`
--

CREATE TABLE `job_requests` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL,
  `status` enum('pending','Accepted','Rejected') NOT NULL DEFAULT 'pending',
  `requested_Date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_requests`
--

INSERT INTO `job_requests` (`ID`, `job_ID`, `user_ID`, `status`, `requested_Date`) VALUES
(91, 83, 202089, 'Accepted', '2023-05-08 13:51:48'),
(92, 82, 202089, 'Rejected', '2023-05-08 13:55:05'),
(96, 49, 202075, 'Accepted', '2023-05-08 17:38:12'),
(97, 82, 202075, 'pending', '2023-05-08 17:38:17'),
(98, 83, 202075, 'pending', '2023-05-08 17:38:22'),
(99, 88, 202075, 'Accepted', '2023-05-08 19:03:01'),
(100, 89, 202075, 'Rejected', '2023-05-08 19:04:04'),
(108, 92, 202075, 'Accepted', '2023-05-09 01:04:51'),
(109, 92, 202075, 'Accepted', '2023-05-09 01:04:54');

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

CREATE TABLE `qualification` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `qualification`
--

INSERT INTO `qualification` (`id`, `description`) VALUES
(9, 'Senior Level\n'),
(12, 'At Least 100 Year Experence'),
(14, 'Qualified');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` enum('Active','inActive') NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0 -> for Applicant\r\n1 -> for Admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `token`, `phone`, `status`, `type`) VALUES
(202041, 'Admin poula', 'admin@gmail.com', '$2b$10$F3YbG127dOvqfnC3WtkuU.3Wjaw7VrskancYhg0.4VPi6gbKmNOpC', 'b26cd174b2611841106b03433b94880a', '01200709861', 'Active', 1),
(202066, 'Maggi Magdy', 'Maggi@gmail.com', '$2b$10$RxDyFQ1ihr5DpSUCFvaW/.ETIvYYKRu9Jy7Tbhjj1ADHUUJ0YDZjW', 'bba115bf89afc1886ce8566e11a783bd', '01200102020', 'Active', 0),
(202075, 'Paula Refaat', 'poularefaat86@gmail.com', '$2b$10$pFXXFCvBABZHkSAqEfyg5.wfJacqlCXH4OJDC42kzJI8l72Bjvqaa', 'ad51bbd61ed02c60a697838780fc65d4', '01200709861', 'Active', 0),
(202085, 'pesoo', 'sss@gmail.com', '$2b$10$Mr3FoHpRp6Q3nT3c7RY9o..T11yZhLLYAJfL4b99m9vU8lnC.SuH6', 'a6f8369a479c30cfb50d1976e442cf04', '01200102020', 'inActive', 0),
(202086, 'بولا رفعت اسحق جريسه', 'poularefaat5@gmail.com', '$2b$10$XFNzOAZ7r5AEkwJyZBJJEeFxDo3AW2/eu1QIGAOF7fr99IL.H78rW', '45872babeb8807ea977467653f332cae', '1200709861', 'Active', 0),
(202087, 'Maggi Maggi Maggiii', 'magmag@gmail.com', '$2b$10$M7lciGn9WKFKUNinlqixC.EKLalPHW/LRPpHZXs3J0R8iBk6I.dZK', 'e7be540a87211546958f81b79d53c0b0', '01200709861', 'inActive', 0),
(202089, 'Abona Shenoda Paula', 'AbonaShenod@gmail.com', '$2b$10$LYQTh1n/Uz5sT6VOFL/OQ.hpA1J/vtKF5Vfck8l6NSOnDeuifdmNG', 'd766f66b3998499a1ea268d2bea11a81', '1200709858', 'Active', 0),
(202091, 'ppp', 'sss@gmail.com', '$2b$10$SuC.diTHG0yaPIizx54aGOmKGRUaQhEYgqJOtr2xrIR1WblO9ZRxS', '8c28391cf713fc1378a28b5de953d6d4', '01200102020', 'Active', 0),
(202093, 'Maggi Magdy', 'poularefaat111@gmail.com', '$2b$10$Nhs3m04Ymxhm23.p.PTe.uBZjnhM5RN9pXjfWeha47JUpMoahdtJy', '342850550062e950279d0ae631b2bf6a', '012007220', 'Active', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_job`
--

CREATE TABLE `user_job` (
  `ID` int(11) NOT NULL,
  `job_ID` int(11) NOT NULL,
  `user_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_job`
--

INSERT INTO `user_job` (`ID`, `job_ID`, `user_ID`) VALUES
(20, 83, 202089),
(21, 82, 202089),
(22, 49, 202089),
(25, 49, 202075),
(26, 82, 202075),
(27, 83, 202075),
(28, 88, 202075),
(29, 89, 202075),
(37, 92, 202075),
(38, 92, 202075);

-- --------------------------------------------------------

--
-- Table structure for table `user_search`
--

CREATE TABLE `user_search` (
  `id` int(11) NOT NULL,
  `user_ID` int(255) NOT NULL,
  `key_word` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_search`
--

INSERT INTO `user_search` (`id`, `user_ID`, `key_word`) VALUES
(56, 202066, 'FullStack Back'),
(122, 202075, 'Doctor');

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
-- Indexes for table `user_search`
--
ALTER TABLE `user_search`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user_search` (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `job_qualification`
--
ALTER TABLE `job_qualification`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `job_requests`
--
ALTER TABLE `job_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `qualification`
--
ALTER TABLE `qualification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=202097;

--
-- AUTO_INCREMENT for table `user_job`
--
ALTER TABLE `user_job`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `user_search`
--
ALTER TABLE `user_search`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

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

--
-- Constraints for table `user_search`
--
ALTER TABLE `user_search`
  ADD CONSTRAINT `id_user_search` FOREIGN KEY (`user_ID`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
