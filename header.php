<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
</head>
<body>
    <header>
        <div class="header-white">
            <nav>
                <ul class="nav-list">
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">Strona Główna</a></li>
                    <li><a href="<?php echo esc_url(home_url('/wheels.html')); ?>">Felgi</a></li>
                    <li><a href="#et-calculator">Kalkulator ET</a></li>
                    <li><a href="#customer-reviews-bg">Opinie</a></li>
                    <li><a href="<?php echo esc_url(home_url('/gallery.html')); ?>">Galeria</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about.html')); ?>">O Nas</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>
            </nav>
        </div>
        <div class="header-black">
            <a href="https://www.facebook.com/p/MS-Trade-Felgi-Opony-Części-100086735444723/?paipv=0&eav=AfbapMBz81Dxbe8dMBfxeTw1aOtIRhJYOwgyy-AC1_FdYyp12bHv6uFyRr1jQzsgcBg&_rdr" target="_blank" class="fab fa-facebook"></a>
            <div class="hamburger-menu">
                <span class="hamburger-icon">&#9776;</span>
            </div>
        </div>
        <div class="hamburger-nav">
            <span class="close-icon"><i class="fa-solid fa-xmark"></i></span>
            <nav>
                <ul class="nav-ham-list">
                    <li><a href="<?php echo esc_url(home_url('/')); ?>">Strona Główna</a></li>
                    <li><a href="<?php echo esc_url(home_url('/wheels.html')); ?>">Felgi</a></li>
                    <li><a href="#et-calculator">Kalkulator ET</a></li>
                    <li><a href="#customer-reviews-bg">Opinie</a></li>
                    <li><a href="<?php echo esc_url(home_url('/gallery.html')); ?>">Galeria</a></li>
                    <li><a href="<?php echo esc_url(home_url('/about.html')); ?>">O Nas</a></li>
                    <li><a href="#contact">Kontakt</a></li>
                </ul>
            </nav>
        </div>
    </header>
