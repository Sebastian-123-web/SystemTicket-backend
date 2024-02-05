-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 05-02-2024 a las 17:51:06
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_ticket`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_machine`
--

CREATE TABLE `tbl_machine` (
  `id_machine` int NOT NULL,
  `machine_name` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL,
  `machine_type` varchar(100) COLLATE utf8mb3_spanish_ci NOT NULL,
  `machine_model` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL,
  `machine_serial` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_machine`
--

INSERT INTO `tbl_machine` (`id_machine`, `machine_name`, `machine_type`, `machine_model`, `machine_serial`) VALUES
(1, 'TBGRGAFCO001', 'DESKTOP', 'HP COMPAQ 8200', 'S5G4SD56DCF2V1'),
(2, 'TBGRCNA001', 'LAPTOP', 'HP 340 G1', 'GJU4D56F4B51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_machine_os`
--

CREATE TABLE `tbl_machine_os` (
  `id_machine_os` int NOT NULL,
  `id_machine` int NOT NULL,
  `id_os` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_machine_os`
--

INSERT INTO `tbl_machine_os` (`id_machine_os`, `id_machine`, `id_os`) VALUES
(1, 1, 5),
(2, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_os`
--

CREATE TABLE `tbl_os` (
  `id_os` int NOT NULL,
  `os_name` varchar(150) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_os`
--

INSERT INTO `tbl_os` (`id_os`, `os_name`) VALUES
(4, 'Windows 7'),
(5, 'Windows 10'),
(6, 'Windows 11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_password`
--

CREATE TABLE `tbl_password` (
  `id_user` int NOT NULL,
  `password` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_password`
--

INSERT INTO `tbl_password` (`id_user`, `password`) VALUES
(1, 'SF2021.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id_user` int NOT NULL,
  `user_name` varchar(100) COLLATE utf8mb3_spanish_ci NOT NULL,
  `user_lastname` varchar(100) COLLATE utf8mb3_spanish_ci NOT NULL,
  `user_email` varchar(250) COLLATE utf8mb3_spanish_ci NOT NULL,
  `user_phone` int NOT NULL,
  `user_annex` int NOT NULL,
  `user_domainuser` varchar(100) COLLATE utf8mb3_spanish_ci NOT NULL,
  `user_access` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

--
-- Volcado de datos para la tabla `tbl_user`
--

INSERT INTO `tbl_user` (`id_user`, `user_name`, `user_lastname`, `user_email`, `user_phone`, `user_annex`, `user_domainuser`, `user_access`) VALUES
(1, 'Rodrigo', 'Bañagasta', 'rbanagasta@transberperu.com', 916367152, 2345, 'rbanagasta', 1),
(2, 'Gian', 'Mariano', 'gmariano@transberperu.com', 987654321, 2345, 'gmariano', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_machine`
--
ALTER TABLE `tbl_machine`
  ADD PRIMARY KEY (`id_machine`);

--
-- Indices de la tabla `tbl_machine_os`
--
ALTER TABLE `tbl_machine_os`
  ADD PRIMARY KEY (`id_machine_os`),
  ADD UNIQUE KEY `id_machine` (`id_machine`,`id_os`),
  ADD KEY `id_os` (`id_os`);

--
-- Indices de la tabla `tbl_os`
--
ALTER TABLE `tbl_os`
  ADD PRIMARY KEY (`id_os`);

--
-- Indices de la tabla `tbl_password`
--
ALTER TABLE `tbl_password`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_machine`
--
ALTER TABLE `tbl_machine`
  MODIFY `id_machine` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_machine_os`
--
ALTER TABLE `tbl_machine_os`
  MODIFY `id_machine_os` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tbl_os`
--
ALTER TABLE `tbl_os`
  MODIFY `id_os` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tbl_password`
--
ALTER TABLE `tbl_password`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_machine_os`
--
ALTER TABLE `tbl_machine_os`
  ADD CONSTRAINT `tbl_machine_os_ibfk_1` FOREIGN KEY (`id_machine`) REFERENCES `tbl_machine` (`id_machine`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `tbl_machine_os_ibfk_2` FOREIGN KEY (`id_os`) REFERENCES `tbl_os` (`id_os`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `tbl_password`
--
ALTER TABLE `tbl_password`
  ADD CONSTRAINT `tbl_password_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `tbl_user` (`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
