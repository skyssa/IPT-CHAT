-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 27, 2023 at 07:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `m_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message_text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`m_id`, `user_id`, `message_text`) VALUES
(80, 2, 'hahahaha'),
(81, 1, 'hehehehe'),
(82, 1, 's'),
(83, 1, 'as'),
(84, 1, 'aa'),
(85, 1, 'a'),
(86, 1, 'as'),
(87, 2, 'sadsa'),
(88, 2, 'dsa'),
(89, 2, 's'),
(90, 2, 'x'),
(91, 2, 'z'),
(92, 1, 'asa'),
(93, 1, 'SA'),
(94, 1, 'sadsa'),
(95, 1, 's'),
(96, 2, 'sa'),
(97, 2, 'sss'),
(98, 2, 'd'),
(99, 2, 'sasa'),
(100, 2, 'sasa'),
(101, 2, 's'),
(102, 2, 's'),
(103, 2, 's'),
(104, 2, 'aasdasdasd'),
(105, 1, 'dsadsadsadsa'),
(106, 1, 'hahaaa'),
(107, 1, 'sadsa'),
(108, 1, 'asdsadsa'),
(109, 1, 'ssss');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`m_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `m_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
