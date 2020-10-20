<?php

add_filter( 'show_admin_bar', '__return_false' );
// add_filter( 'show_admin_bar', '__return_true' );
define('CSS_DIR', get_stylesheet_directory_uri() . '/style');
define('IMG_DIR', get_stylesheet_directory_uri() . '/img');
define('FAVICON_DIR', get_stylesheet_directory_uri() . '/favicon');
define('JS_DIR', get_stylesheet_directory_uri() . '/script');
define('LIBS_DIR', get_stylesheet_directory_uri() . '/libs');
// echo IMG_DIR;

add_action('wp_enqueue_scripts', function(){
  wp_enqueue_style( 'work02-style', get_stylesheet_uri() );
  wp_enqueue_style( 'work02_style_main', CSS_DIR . '/main.css' );
  wp_enqueue_script( 'work02_script_init', LIBS_DIR . '/init.js' );
  wp_add_inline_script( 'work02_script_init', 'window.paths = {libs: "' . LIBS_DIR .'", script: "' . JS_DIR . '", img: "' . IMG_DIR . '"}', 'before' );
  wp_enqueue_script( 'work02_script_vendors', JS_DIR . '/vendors~main.js', null, null, true );
  wp_enqueue_script( 'work02_script_main', JS_DIR . '/main.js', ['work02_script_vendors'], null, true );
});