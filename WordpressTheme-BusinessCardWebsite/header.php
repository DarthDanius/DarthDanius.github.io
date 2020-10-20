<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package advokatryazanov
 */

?>

<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="yandex-verification" content="7fad5386512be527" />
	<meta name="google-site-verification" content="yCzAuQfdHa1yuT5zrfMldT3-Fvi25LeXLK3ui-KMqd4" />
  
  <title>
  <?php
    if( is_front_page() ) {
      echo bloginfo('name');
    } else {
      echo bloginfo('name'); echo ' | '; echo wp_title('');
    }
  ?>
  </title>
	<?php wp_head() ?>
</head>
<body>

  <div class="content">

    <?php if( is_front_page() ) : ?>
      <section class="section-welcome">
      <div class="section-welcome__cont fixed-container">
      <header id="heder-main" class="section-welcome__header header">
    <?php else : ?>
      <div class="wrapper-header">
      <header id="heder-main" class="header fixed-container">
    <?php endif; ?>

          <div class="header__dummy_logo">
            <?php the_custom_logo(); ?>
          </div>

          <div class="header__contacts">
            <a href="#" class="header__contact link"><?php echo getAddress(['city', 'street'], ', ') ?></a>
            <a href="mailto:<?php the_field('mail', 2);?>" class="header__contact link"><?php the_field('mail', 2);?></a>
          </div>

          <ul class="header__icon-social icon-social">

              <?php  
                foreach (get_field('social', 2) as $value) {
                  echo <<<EOT
                  <li class="icon-social__item">
                    <a href="{$value['link']}" class="icon-social__link link_img">
                      <img class="icon-social__icon" src="{$value['icon']}" alt="icon-social">
                    </a>
                  </li>

EOT;
                }
              ?>

          </ul>

          <div class="header__dummy"></div>

          <nav id="nav-burger" class="header__nav nav">
            <?php 
              wp_nav_menu( [
                'menu'            => 'Main',
                'container'       => false,
                'menu_class'      => 'nav__list',
                'echo'            => true,
                'fallback_cb'     => 'wp_page_menu',
                'items_wrap'      => '<ul class="nav__list">%3$s</ul>',
                'depth'           => 1,
              ] );
            ?>
          </nav>

          <!-- <button class="header__btn-call btn btn_call" type="button"><?php echo get_field('phons', 2)['tel-01']['string'];?></button> -->
          <a class="header__btn-call btn_call" href="tel:+<?php echo get_field('phons', 2)['tel-01']['value'];?>">
            <span><?php echo get_field('phons', 2)['tel-01']['string'];?></span>
          </a>
        
        </header>

        <?php if( is_front_page() ) : ?>
          <h1 class="section-welcome__title title title_main">
            <?php the_field('section-welcome_title'); ?>
          </h1>

          <a href="#contact_form_pop" class="fancybox-inline section-welcome__btn-consultation btn_main">
            <span>Получить консультацию</span>
          </a>
          
          <ul class="section-welcome__advantages advantages">

            <li class="advantages__item">
              <div class="advantages__dummy"></div>
              <h4 class="advantages__title">Гарантия <br> успеха</h4>
              <h5 class="advantages__subtitle">Более 2000 успешных дел <br> 13лет профессионального опыта</h5>
            </li>

            <li class="advantages__item">
              <div class="advantages__dummy"></div>
              <h4 class="advantages__title">Бесплатная<br/>консультация</h4>
              <h5 class="advantages__subtitle">Юридическая консультация <br> On-line</h5>
            </li>

            <li class="advantages__item">
              <div class="advantages__dummy"></div>
              <h4 class="advantages__title">Компенсация<br> затрат</h4>
              <h5 class="advantages__subtitle">Взыскание расходов на юриста<br> со второй стороны</h5>
            </li>

          </ul>

          </div>
          </section>
        <?php else : ?>
          </header>
          </div>
        <?php endif; ?>