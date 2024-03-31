-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th3 31, 2024 lúc 02:16 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `backend_web`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cart`
--

CREATE TABLE `cart` (
  `id` int(5) NOT NULL,
  `productId` int(5) NOT NULL,
  `quantity` int(5) NOT NULL,
  `userId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `cart`
--

INSERT INTO `cart` (`id`, `productId`, `quantity`, `userId`) VALUES
(1, 7, 5, 1),
(5, 8, 5, 1),
(6, 9, 18, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'xiaomi'),
(2, 'oppo'),
(3, 'realme'),
(4, 'vivo'),
(5, 'other');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `favorite`
--

CREATE TABLE `favorite` (
  `id` int(5) NOT NULL,
  `productId` int(5) NOT NULL,
  `userId` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `favorite`
--

INSERT INTO `favorite` (`id`, `productId`, `userId`) VALUES
(1, 5, 1),
(2, 7, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_detail`
--

CREATE TABLE `order_detail` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `created_ar` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_ar` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payment_detail`
--

CREATE TABLE `payment_detail` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `provider` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_ar` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `imageUrl` varchar(300) NOT NULL,
  `videoUrl` varchar(300) DEFAULT NULL,
  `oldPrice` int(11) NOT NULL,
  `newPrice` int(11) NOT NULL,
  `chip` varchar(40) NOT NULL,
  `ram` int(11) NOT NULL,
  `rom` int(11) NOT NULL,
  `screen` varchar(80) NOT NULL,
  `pin` int(11) NOT NULL,
  `selfieCam` varchar(10) NOT NULL,
  `behindCam` varchar(50) NOT NULL,
  `chargeSpeed` int(11) NOT NULL,
  `rate` int(11) NOT NULL,
  `numberReview` int(11) DEFAULT NULL,
  `slug` varchar(200) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `product`
--

INSERT INTO `product` (`id`, `name`, `category`, `imageUrl`, `videoUrl`, `oldPrice`, `newPrice`, `chip`, `ram`, `rom`, `screen`, `pin`, `selfieCam`, `behindCam`, `chargeSpeed`, `rate`, `numberReview`, `slug`, `quantity`) VALUES
(1, 'Galaxy S24 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709373173/samsung/samsung-galaxy-s24-5g_rvz4m9.png', 'https://youtu.be/25ygoCCYhIo?si=YuFZG3dkk0k7cZhu', 25000000, 22000000, 'Exynos 2400', 8, 256, 'Dynamic AMOLED 2X6.2\"Full HD+', 4000, '12 MP', 'Chính 50 MP & Phụ 12 MP, 10 MP', 25, 0, 1, 'samsung-galaxy-s24', 30),
(2, 'Galaxy S23 FE 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709394116/samsung/samsung-galaxy-s23-fe-5g_yfofqu.jpg', 'https://youtu.be/aexDsiA-Uec', 14890000, 13390000, 'Exynos 2200 8 nhân', 8, 128, 'Dynamic AMOLED 2X6.4\"Full HD+', 4500, '10 MP', 'Chính 50 MP & Phụ 12 MP, 8 MP', 25, 0, 0, 'samsung-galaxy-s23-fe-5g', 20),
(3, 'Galaxy S24 Ultra 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709395636/samsung/samsung-galaxy-s24-ultra_rniae3.jpg', 'https://youtu.be/Rrn-ohCq9d0?si=_LPk05SXzp444vJs', 33990000, 32490000, 'Snapdragon 8 Gen 3 for Galaxy', 12, 256, 'Dynamic AMOLED 2X6.8\"Quad HD+ (2K+)', 5000, '12 MP', 'Chính 200 MP & Phụ 50 MP, 12 MP, 10 MP', 45, 0, 0, 'samsung-galaxy-s24-ultra-5g', 15),
(4, 'Galaxy A25 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709396257/samsung/samsung-galaxy-a25_zpbszg.jpg', 'https://youtu.be/c6nbFjhDhVU', 6690000, 6990000, 'Exynos 1280', 8, 128, 'Super AMOLED6.5\"Full HD+', 5000, '13 MP', 'Chính 50 MP & Phụ 8 MP, 2 MP', 25, 0, 0, 'samsung-galaxy-a25', 25),
(5, 'Galaxy Z Flip5 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709396611/samsung/samsung-galaxy-z-flip5_gangc4.webp', 'https://youtu.be/xkF1ao4nGcg', 25990000, 21990000, 'Snapdragon 8 Gen 2 for Galaxy', 8, 256, 'Chính: Dynamic AMOLED 2X, Phụ: Super AMOLEDChính 6.7\" & Phụ 3.4\"Full HD+', 3700, '10 MP', '2 camera 12 MP', 25, 0, 0, 'samsung-galaxy-z-flip5', 20),
(6, 'Galaxy Z Fold5 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709396929/samsung/samsung-galaxy-z-fold5_qmnigm.jpg', 'https://youtu.be/2yGhm33ZYF0', 42990000, 40990000, 'Snapdragon 8 Gen 2 for Galaxy', 12, 256, 'Dynamic AMOLED 2XChính 7.6\" & Phụ 6.2\"Quad HD+ (2K+)', 4400, '10 MP & 4 ', 'Chính 50 MP & Phụ 12 MP, 10 MP', 25, 0, 0, 'samsung-galaxy-z-fold5', 22),
(7, 'Galaxy A14', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709397445/samsung/samsung-galaxy-a14_jfohf5.jpg', 'https://youtu.be/34vTDxNpy20', 4990000, 3390000, 'Exynos 850', 6, 128, 'PLS LCD6.6\"Full HD+', 5000, '13 MP', 'Chính 50 MP & Phụ 5 MP, 2 MP', 15, 0, 0, 'samsung-galaxy-a14', 26),
(8, 'Galaxy A15 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709397751/samsung/samsung-galaxy-a15-5g_a5gexu.jpg', 'https://youtu.be/AduTeJUQhF0', 6290000, 5990000, 'MediaTek Dimensity 6100+', 8, 256, 'Super AMOLED6.5\"Full HD+', 5000, '13 MP', 'Chính 50 MP & Phụ 5 MP, 2 MP', 25, 0, 0, 'samsung-galaxy-a15-5g', 13),
(9, 'Galaxy S23 Ultra 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709398233/samsung/samsung-galaxy-s23-ultra-thumb-den-600x600_klhqwm.jpg', 'https://youtu.be/umwDFKfrLNw', 31990000, 24990000, 'Snapdragon 8 Gen 2 for Galaxy', 8, 256, 'Dynamic AMOLED 2X6.8\"Quad HD+ (2K+)', 5000, '12 MP', 'Chính 200 MP & Phụ 12 MP, 10 MP, 10 MP', 45, 0, 0, 'samsung-galaxy-s23-ultra', 18),
(10, 'Galaxy M54 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709398512/samsung/samsung-galaxy-m54-bac-thumb-600x600_in4fhm.jpg', 'https://youtu.be/8-NMeQZKPms', 11990000, 10490000, 'Exynos 1380 8 nhân', 8, 256, 'Super AMOLED Plus6.7\"Full HD+', 6000, ' 32 MP', 'Chính 108 MP & Phụ 8 MP, 2 MP', 25, 0, 0, 'samsung-galaxy-m54', 21),
(11, 'Galaxy A54 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709399947/samsung/samsung-galaxy-a54-thumb-tim-600x600_iw3aff.jpg', 'https://youtu.be/TReqnMpzK7k', 10490000, 8390000, 'Exynos 1380 8 nhân', 8, 128, 'Super AMOLED6.4\"Full HD+', 5000, '32 MP', 'Chính 50 MP & Phụ 12 MP, 5 MP', 25, 0, 0, 'samsung-galaxy-a54-5g', 22),
(12, 'Galaxy S21 FE 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709400153/samsung/Samsung-Galaxy-S21-FE-vang-1-2-600x600_if1gdd.jpg', 'https://youtu.be/uPzXp00pUsQ', 12990000, 9490000, 'Exynos 2100', 6, 128, 'Dynamic AMOLED 2X6.4\"Full HD+', 4500, '32 MP', 'Chính 12 MP & Phụ 12 MP, 8 MP', 25, 0, 0, 'samsung-galaxy-s21-fe', 31),
(13, 'Galaxy A34 5G ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709400377/samsung/samsung-galaxy-a34-thumb-xanh-600x600_zynd9x.jpg', 'https://youtu.be/1Zx1Av_FRTs', 8490000, 6990000, 'MediaTek Dimensity 1080 8 nhân', 8, 128, 'Super AMOLED6.6\"Full HD+', 5000, '13 MP', 'Chính 48 MP & Phụ 8 MP, 5 MP', 25, 0, 0, 'samsung-galaxy-a34-5g', 40),
(14, 'Galaxy M34 5G', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709400701/samsung/samsung-galaxy-m34-5g-den-600x600_bz9ihv.jpg', 'https://youtu.be/CL67v6TCKCo?si=0VywKf0pfTbyVPjh', 7990000, 7490000, 'Exynos 1280', 8, 128, 'Super AMOLED6.5\"Full HD+', 6000, '13 MP', 'Chính 50 MP & Phụ 8 MP, 2 MP', 25, 0, 0, 'samsung-galaxy-m34-5g', 17),
(15, 'Galaxy A24 ', 'samsung', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709401019/samsung/samsung-galaxy-a24-green-thumb-600x600_npii7z.jpg', 'https://youtu.be/TkpKsRvfF_c?si=RBE0mUtJPxaF-ux0', 6990000, 4990000, 'MediaTek Helio G99', 8, 128, 'Super AMOLED6.5\"Full HD+', 5000, '13 MP', 'Chính 50 MP & Phụ 5 MP, 2 MP', 25, 0, 0, 'samsung-galaxy-a24', 10),
(16, 'iPhone 15 Pro Max ', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709477319/iphone/iphone-15-pro-max-blue-thumbnew-600x600_pcjb8h.jpg', 'https://youtu.be/xw3EJQ79MCU?si=meMkC_8-Lc5abENe', 34990000, 30990000, 'Apple A17 Pro 6 nhân', 8, 256, 'OLED6.7\"Super Retina XDR', 4422, '12 MP', 'Chính 48 MP & Phụ 12 MP, 12 MP', 20, 0, 0, 'iphone-15-pro-max', 15),
(17, 'iPhone 15 Pro', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709477596/iphone/iphone-15-pro-blue-thumbnew-600x600_sobiru.jpg', 'https://youtu.be/XacwJVIIoX0?si=kgtIMYwkO72tXkq1', 28990000, 26890000, 'Apple A17 Pro 6 nhân', 8, 128, 'OLED6.1\"Super Retina XDR', 3274, '12 MP', 'Chính 48 MP & Phụ 12 MP, 12 MP', 20, 0, 0, 'iphone-15-pro', 12),
(18, 'iPhone 15 Plus', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709477847/iphone/iphone-15-plus-hong-128gb-thumb-600x600_hbbnsy.jpg', 'https://youtu.be/LxHuYNRux_E?si=Zu4XFVZ5SY78M-a-', 25990000, 23490000, 'Apple A16 Bionic', 6, 128, 'OLED6.7\"Super Retina XDR', 4383, ' 12 MP', 'Chính 48 MP & Phụ 12 MP', 20, 0, 0, 'iphone-15-plus', 32),
(19, 'iPhone 13', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709478824/iphone/iphone-13-starlight-1-600x600_k83gbc.jpg', 'https://youtu.be/A7qIRbLj8bk', 17790000, 14990000, ' Apple A15 Bionic', 4, 128, 'OLED6.1\"Super Retina XDR', 3240, ' 12 MP', '2 camera 12 MP', 20, 0, 0, 'iphone-13', 21),
(20, 'iPhone 11', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709479052/iphone/iphone-11-trang-600x600_gdzz7d.jpg', 'https://youtu.be/N_TDaqZJ9c0?si=ZB3BZuJ0t1bmMT0H', 11790000, 9990000, 'Apple A13 Bionic', 4, 64, 'IPS LCD6.1\"Liquid Retina', 3110, '12 MP', '2 camera 12 MP', 18, 0, 0, 'iphone-11', 11),
(21, 'iPhone 12', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709480133/iphone/iphone-12-trang-13-600x600_jchos3.jpg', 'https://youtu.be/O_Kj9TJDR-o', 12090000, 14890000, 'Apple A14 Bionic', 4, 64, 'OLED6.1\"Super Retina XDR', 2815, '12 MP', '2 camera 12 MP', 20, 0, 0, 'iphone-12', 12),
(22, 'iPhone 14 Pro Max', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709480355/iphone/iphone-14-pro-max-tim-thumb-600x600_chchft.jpg', 'https://youtu.be/8mEsqRWPGWg', 29490000, 27390000, 'Apple A16 Bionic', 6, 128, 'OLED6.7\"Super Retina XDR', 4323, ' 12 MP', 'Chính 48 MP & Phụ 12 MP, 12 MP', 20, 0, 0, 'iphone-14-pro-max', 18),
(23, 'iPhone 14 Plus', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709483149/iphone/iPhone-14-plus-thumb-xanh-1-600x600_e1cto1.jpg', 'https://youtu.be/bml0r_KxON0', 22990000, 20090000, 'Apple A15 Bionic', 6, 128, 'OLED6.7\"Super Retina XDR', 4325, '12 MP', '2 camera 12 MP', 20, 0, 0, 'iphone-14-plus', 20),
(24, 'iPhone 14 ', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709483400/iphone/iPhone-14-thumb-tim-1-600x600_h8julo.jpg', 'https://youtu.be/9nkD9YG1Tyo', 20490000, 17490000, 'Apple A15 Bionic', 6, 128, 'OLED6.1\"Super Retina XDR', 3279, '12 MP', '2 camera 12 MP', 20, 0, 0, 'iphone-14', 15),
(25, 'iPhone 12 Pro Max', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709483789/iphone/1_251_1_mgebge.webp', 'https://youtu.be/pXaAY6Wyz6o', 28990000, 23490000, 'Apple A14 Bionic (5 nm)', 6, 128, 'OLED6.7\"Super Retina XDR', 3687, '12 MP', '3 camera 12 MP', 20, 0, 0, 'iphone-12-pro-max', 22),
(26, 'iPhone Xs Max', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709484308/iphone/iphone-xs-max-512gb-xam-1-org_j6xpbb.jpg', 'https://youtu.be/zVBt45nO8g8', 14990000, 11290000, 'Apple A12 Bionic', 4, 512, 'OLED6.5\"Super Retina', 3174, '7 MP', '2 camera 12 MP', 0, 0, 0, 'iphone-xs-max', 23),
(27, 'iPhone XR', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709484622/iphone/iphone-xr-xanh-2-org_fuel8e.jpg', 'https://youtu.be/ZYoZE-A7CWk', 16990000, 12890000, 'Apple A12 Bionic', 3, 128, 'IPS LCD6.1\"Liquid Retina', 2942, '7 MP', '12 MP', 15, 0, 0, 'iphone-xr', 26),
(28, 'iPhone 15', 'iphone', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709484873/iphone/iphone-15-hong-thumb-1-600x600_lkcyhz.jpg', 'https://youtu.be/2CiyAvMUGwU?si=GFhuzsYanzYOWZD2', 22990000, 20490000, ' Apple A16 Bionic', 6, 128, 'OLED6.1\"Super Retina XDR', 3349, '12 MP', 'Chính 48 MP & Phụ 12 MP', 20, 0, 0, 'iphone-15', 38),
(29, 'Xiaomi Redmi Note 12 Pro 128GB ', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709371927/xiaomi/xiaomi-redmi-12_rxr7ap.jpg', 'https://youtu.be/_LS0PYl9FyA', 7190000, 6390000, 'Snapdragon 732G', 8, 128, 'AMOLED6.67\"Full HD+', 5000, ' 16 MP', 'Chính 108 MP & Phụ 8 MP, 2 MP, 2 MP', 67, 0, 0, 'xiaomi-redmi-note-12-pro-4g', 1000),
(30, 'Xiaomi Redmi Note 13', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709379672/xiaomi/xiaomi-redmi-note-13-black-thumb-600x600_rv9ddb.jpg', 'https://youtu.be/2cjgMJYd66k', 4800000, 4590000, 'Snapdragon 685 8 nhân', 6, 128, 'AMOLED6.67\"Full HD+', 5000, '16 MP', ' Chính 108 MP & Ph? 8 MP, 2 MP', 33, 0, 0, 'xiaomi-redmi-note-13', 90),
(31, 'Xiaomi Redmi Note 13 Pro+ 5G', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709379885/xiaomi/xiaomi-redmi-note-13-pro-plus-white-thumb-600x600_ep3x3d.jpg', 'https://youtu.be/bF3HkGhB0-M', 11500000, 10880000, 'MediaTek Dimensity 7200 Ultra', 8, 256, 'AMOLED6.67\"1.5K', 5000, '16 MP', ' Chính 200 MP & Ph? 8 MP, 2 MP', 120, 0, 0, 'xiaomi-redmi-note-13-pro-plus', 80),
(32, 'Xiaomi Redmi Note 13 Pro 5G', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709380685/xiaomi/xiaomi-redmi-note-13-pro-5g-violet-thumb-600x600_q5u1va.jpg', 'https://youtu.be/bF3HkGhB0-M', 9490000, 8990000, 'Snapdragon 7s Gen 2 8 nhân', 8, 256, 'AMOLED6.67\"1.5K', 5100, '16 MP', 'Chính 200 MP & Ph? 8 MP, 2 MP', 67, 0, 0, 'xiaomi-redmi-note-13-pro-5g', 100),
(33, 'Xiaomi 13T Pro 5G', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709380924/xiaomi/xiaomi-13t-pro-xanh-thumb-600x600_kknslb.jpg', 'https://youtu.be/iWRH9L3q4HU', 15990000, 13490000, 'MediaTek Dimensity 9200+ 5G 8 nhân', 12, 256, 'AMOLED6.67\"1.5K', 5000, '20 MP', 'Chính 50 MP & Ph? 50 MP, 12 MP', 120, 0, 0, 'xiaomi-13t-pro', 70),
(34, 'Xiaomi 13T 5G', 'xiaomi', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709381147/xiaomi/xiaomi-13t-xanh-thumb-thumb-600x600_zzepne.jpg', 'https://youtu.be/508N9_T1uhU', 12990000, 11490000, 'MediaTek Dimensity 8200-Ultra', 12, 256, 'AMOLED6.67\"1.5K', 5000, '20 MP', 'Chính 50 MP & Ph? 50 MP, 12 MP', 67, 0, 0, 'xiaomi-13t-12gb', 50),
(35, 'Reno11 5G', 'oppo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709431776/oppo/oppo-reno-11-xanh-thumb-600x600_-_Sao_ch%C3%A9p_l8xz5v.jpg', 'https://youtu.be/CNgwDsqFltE', 10990000, 10690000, 'MediaTek Dimensity 7050 5G 8 nhân', 8, 256, 'AMOLED6.7\"Full HD+', 5000, '32 MP', 'Chính 50 MP & Ph? 32 MP, 8 MP', 67, 0, 0, 'oppo-reno11', 50),
(36, 'A18', 'oppo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709431775/oppo/oppo-a18-xanh-thumb-1-2-3-600x600_gtcgxo.jpg', 'https://youtu.be/V4vIuwLvld4', 3690000, 3190000, 'MediaTek Helio G85', 4, 64, 'IPS LCD6.56\"HD+', 5000, '5 MP', ' Chính 8 MP & Ph? 2 MP', 10, 0, 0, 'oppo-a18', 40),
(37, 'A38', 'oppo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709431776/oppo/oppo-a38-black-thumb-600x600_evupeq.jpg', 'https://youtu.be/o0w-0gq8UuQ', 4490000, 3990000, 'MediaTek Helio G85', 6, 128, 'IPS LCD6.56\"HD+', 4000, ' 5 MP', 'Chính 50 MP & Ph? 2 MP', 33, 0, 0, 'oppo-a38', 50),
(38, 'Reno10 5G', 'oppo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709431775/oppo/oppo-reno10-blue-thumbnew-600x600_x70rnt.jpg', 'https://youtu.be/mmvujvxC8rY', 9990000, 8690000, 'MediaTek Dimensity 7050 5G 8 nhân', 8, 128, 'AMOLED6.7\"Full HD+', 5000, '32 MP', 'Chính 64 MP & Ph? 32 MP, 8 MP', 67, 0, 0, 'oppo-reno10-5g', 30),
(39, 'Reno10 Pro 5G', 'oppo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709431775/oppo/oppo-reno10-pro-grey-thumbnew-600x600_aethsf.jpg', 'https://youtu.be/TglK5aG_fbM', 13990000, 13290000, 'Snapdragon 778G 5G', 12, 256, 'AMOLED6.7\"Full HD+', 4600, '32 MP', 'Chính 50 MP & Ph? 32 MP, 8 MP', 80, 0, 0, 'oppo-reno10-pro', 100),
(40, 'vivo Y36', 'vivo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432053/vivo/vivo-y36-xanh-thumbnew-600x600_qwzavu.jpg', 'https://youtu.be/oSNRS6A-d9Y', 5490000, 4990000, 'Snapdragon 680', 8, 128, 'IPS LCD6.64\"Full HD+', 5000, '16 MP', 'Chính 50 MP & Ph? 2 MP', 44, 0, 0, 'vivo-y36', 90),
(41, 'vivo Y22s', 'vivo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432046/vivo/vivo-y22s-vang-thumb-600x600_hkypyy.jpg', 'https://youtu.be/lQ0_S7GPSgE', 5990000, 5090000, 'Snapdragon 680', 8, 128, 'IPS LCD6.55\"HD+', 3500, '8 MP', 'Chính 50 MP & Ph? 2 MP', 18, 0, 0, 'vivo-y22s', 30),
(42, 'vivo V29 5G', 'vivo', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432045/vivo/vivo-v29-den-thumb-600x600_z6g9fd.jpg', 'https://youtu.be/iP3Pi3oQBIM', 12990000, 1199000, 'Snapdragon 778G 5G', 12, 256, 'AMOLED6.78\"1.5K', 4600, '50 MP', 'Chính 50 MP & Ph? 8 MP, 2 MP', 80, 0, 0, 'vivo-v29-5g', 30),
(43, 'realme C35', 'realme', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432159/realme/realme-c35-vang-thumb-600x600_lfkq2v.jpg', 'https://youtu.be/TEceK2DDqFY', 4990000, 4190000, 'MediaTek Helio G88', 6, 128, 'IPS LCD6.72\"Full HD+', 5000, '8 MP', 'Chính 64 MP & Ph? 2 MP', 33, 0, 0, 'realme-c35', 50),
(44, 'realme 11', 'realme', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432155/realme/realme-11-thumb-600x600_otser5.jpg', 'https://youtu.be/Rlrkb62Av_Q', 7300000, 5990000, 'MediaTek Helio G99', 8, 128, 'Super AMOLED6.4\"Full HD+', 5000, '16 MP', 'Chính 108 MP & Ph? 2 MP', 67, 0, 0, 'realme-11', 50),
(45, 'Itel L6502 ', 'other', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432246/other/itel-l6502-den-600x600_itomnd.jpg', 'https://youtu.be/V4vIuwLvld4', 2200000, 1690000, 'Spreadtrum SC9832E', 3, 32, 'IPS LCD6.52\"HD+', 4000, '5 MP', 'Chính 8 MP & Ph? VGA, VGA', 5, 0, 0, 'itel-l6502', 10),
(46, 'ROG Phone 7', 'other', 'https://res.cloudinary.com/drfr5hfse/image/upload/v1709432245/other/asus-rog-phone-7_nxs7rk.webp', 'https://youtu.be/bf3X5lISO_w', 24990000, 21490000, 'Qualcomm Snapdragon 8 Gen2', 16, 512, 'AMOLED 6.78 inches', 6000, '32 MP', 'Chính 50 MP & Ph? 50 MP, 12 MP', 65, 0, 0, 'asus-rog-phone-7', 20);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` text NOT NULL,
  `role` varchar(20) DEFAULT NULL,
  `refreshToken` varchar(600) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `modified_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `role`, `refreshToken`, `address`, `phone`, `created_at`, `modified_at`) VALUES
(1, 'Pham Anh Tu', 'Phamanh559@gmail.com', '$2b$10$8o2eLkfn.SqPx9dBf1zileqMwtm9Rj65tN2pu66HuZQIWkDIebDAe', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTE4ODcwNDcsImV4cCI6MTcxNDQ3OTA0N30.QHyiXZ45qZkDxHOD22QLuVc-h4hXki6xUnVKhEX2hIY', NULL, NULL, '2024-02-25 10:02:31', NULL),
(2, 'Pham Anh Tu', 'Phamtu559@gmail.com', '$2b$10$XdbPt8b9GB/H3yL0cY1k8uKAKcaeQDgTXBwU02qdjBL/g00SkyjpG', 'admin', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoyLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzExMjk1OTU1LCJleHAiOjE3MTM4ODc5NTV9.ORkBQ98MGTCfkiVYTr_4PgfGCh-PAhvyR4imX6X3GPM', 'Phao dai lang', 565712335, '2024-02-25 10:03:05', NULL),
(7, 'Nguyễn Lương Vững', 'luongvung@gmail.com', '$2b$10$W3M62YmHwF/LcOrcCPkPIOv5Maso8FwVdwBgVo5hGlC4aBsAr6g1W', 'user', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo3LCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MTE2NDMwMTMsImV4cCI6MTcxNDIzNTAxM30.HaoSOo4KkX-yysQst9S89gjsn1dngnaVoFMwovQAkMI', NULL, NULL, '2024-03-04 01:17:02', NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_product` (`productId`);

--
-- Chỉ mục cho bảng `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorite_product` (`productId`);

--
-- Chỉ mục cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `payment_detail`
--
ALTER TABLE `payment_detail`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `favorite`
--
ALTER TABLE `favorite`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payment_detail`
--
ALTER TABLE `payment_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT cho bảng `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);

--
-- Các ràng buộc cho bảng `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `favorite_product` FOREIGN KEY (`productId`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
