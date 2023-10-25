-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 25/10/2023 às 08:22
-- Versão do servidor: 10.6.12-MariaDB-0ubuntu0.22.04.1
-- Versão do PHP: 8.1.2-1ubuntu2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `Medical`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `agendamento`
--

CREATE TABLE `agendamento` (
  `id` int(11) NOT NULL,
  `data` varchar(255) NOT NULL,
  `horario` varchar(255) NOT NULL,
  `especialidade` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `agendamento`
--

INSERT INTO `agendamento` (`id`, `data`, `horario`, `especialidade`) VALUES
(1, 'gdfg', 'dfgdfg', 'dfgdfgfg'),
(2, '24325235', 'dfgdfg235345345', '5252452345234'),
(3, '24325235', 'dfgdfg235345345', '5252452345234'),
(4, 'poki', 'nju', 'ana'),
(5, 'poki', 'nju', 'ana'),
(6, 'oiuy', 'ghj', 'plkj'),
(7, 'oiuy', 'ghj', 'plkj'),
(8, 'oiuy', 'ghj', 'plkj'),
(9, 'oiuy', 'ghj', 'plkj'),
(10, '.', '..', '...'),
(11, '.', '..', '...'),
(12, '.', '..', '...'),
(13, '.', '..', '...'),
(14, '.', '..', '...'),
(15, '.', '..', '...'),
(16, '.', '..', '...'),
(17, '.', '..', '...'),
(18, '.', '..', '...'),
(19, '.', '..', '...'),
(20, 'gdfg', 'gdfgdfgdf', 'dgdfgdfgdfgdfgdf'),
(21, 'gdfg', 'gdfgdfgdf', 'dgdfgdfgdfgdfgdf'),
(22, 'gdfg', 'gdfgdfgdf', 'dgdfgdfgdfgdfgdf'),
(23, ',yjrghh', 'tstusrt', 'aryhs'),
(24, ',yjrghh', 'tstusrt', 'aryhs'),
(25, ',yjrghh', 'tstusrt', 'aryhs'),
(26, ',yjrghh', 'tstusrt', 'aryhs'),
(27, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(28, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(29, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(30, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(31, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(32, ',yjrghhl', 'tstusrtl', 'aryhsç'),
(33, '', '', ''),
(34, '', '', ''),
(35, '', '', ''),
(36, '', '', ''),
(37, '', '', ''),
(38, '', '', ''),
(39, '', '', ''),
(40, '', '', ''),
(41, '', '', ''),
(42, '', '', ''),
(43, '', '', ''),
(44, '', '', ''),
(45, '', '', ''),
(46, '', '', ''),
(47, 'gh', 'er', 'qwer');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `agendamento`
--
ALTER TABLE `agendamento`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `agendamento`
--
ALTER TABLE `agendamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
