<?php

add_theme_support('custom-logo');
add_theme_support('post-thumbnails');
add_theme_support('menus');
add_post_type_support( 'page', 'excerpt' );

add_filter( 'show_admin_bar', '__return_false' );
add_filter( 'get_custom_logo', 'change_logo_class' );
  function change_logo_class( $html ) {
    $html = str_replace( 'custom-logo', 'header__logo', $html );
    $html = str_replace( 'custom-logo-link', 'header__logo-link', $html );
    return $html;
}

add_filter( 'excerpt_length', function(){
  return 10;
});

add_filter('excerpt_more', function($more) {
  return '...';
});

add_filter('nav_menu_link_attributes', 'filter_nav_menu_link_attribute', 10, 3);
function filter_nav_menu_link_attribute($atts, $item, $args) {
  if ($args -> menu === 'Main') {
    $atts['class'] = 'nav__link link';

    // print_r($item);

    if ($item -> current) {
      $atts['class'] = $atts['class'] . ' nav__link_current';
    };

    if ($item->ID === 124 && strpos(get_permalink(), 'services')) {
      $atts['class'] = $atts['class'] . ' nav__link_current';
    }

    if ($item->ID === 125 && strpos(get_permalink(), 'articles')) {
      $atts['class'] = $atts['class'] . ' nav__link_current';
    }
  }
  return $atts;
}

add_filter('nav_menu_css_class', 'filter_nav_menu_css_class', 10, 3);
function filter_nav_menu_css_class($classes, $item, $args) {
  if ($args -> menu === 'Main') {
    array_push($classes, 'nav__item');
  }
  return $classes;
}

add_action('wp_default_scripts', function ($scripts) {
  if (!empty($scripts->registered['jquery'])) {
      $scripts->registered['jquery']->deps = array_diff($scripts->registered['jquery']->deps, ['jquery-migrate']);
  }
});

add_filter('wpcf7_autop_or_not', '__return_false');

add_filter( 'acf/location/rule_types', 'acf_location_rules_types', 999 );
function acf_location_rules_types( $choices ) {
  $key = __('Forms', 'acf');
  if ( ! isset( $choices[ $key ] ) ) {
    $choices[ $key ] = [];
  }
  $choices[ $key ]['category_id'] = __( 'Category' );
  return $choices;
}

add_filter( 'acf/location/rule_values/category_id', 'acf_location_rules_values_category' );
function acf_location_rules_values_category( $choices ) {
  $terms = get_terms( 'category', [ 'hide_empty' => false ] );
  if ( $terms && is_array( $terms ) ) {
    foreach ( $terms as $term ) {
      $choices[ $term->term_id ] = $term->name;
    }
  }
  return $choices;
}

add_filter( 'acf/location/rule_match/category_id', 'acf_location_rules_match_category', 10, 3 );
function acf_location_rules_match_category( $match, $rule, $options ) {
  $screen = get_current_screen();
  if ( $screen->base !== 'term' || $screen->id !== 'edit-category' ) {
    return $match;
  }
  $term_id       = $_GET['tag_ID'];
  $selected_term = $rule['value'];

  if ( $rule['operator'] == '==' ) {
    $match = ( $selected_term == $term_id );
  } elseif ( $rule['operator'] == '!=' ) {
    $match = ( $selected_term != $term_id );
  }
  return $match;
}

add_action('enqueue_block_editor_assets', 'my_gutenberg_style');

define('PREFIX', 'advokatryazanov_');
define('CSS_DIR', get_stylesheet_directory_uri() . '/assets/style');
define('IMG_DIR', get_stylesheet_directory_uri() . '/assets/img');
define('FAVICON_DIR', get_stylesheet_directory_uri() . '/assets/favicon');
define('JS_DIR', get_stylesheet_directory_uri() . '/assets/script');
define('LIBS_DIR', get_stylesheet_directory_uri() . '/assets/libs');

function my_gutenberg_style() {
  wp_enqueue_style(
    'my-gutenberg-editor-style',
    get_stylesheet_directory_uri() . "/editor.css",
    array(),
    '1.0'
  );
};

function getAddress($fieldNames, $sep) {
  $result = '';
  foreach ($fieldNames as $fieldName) {
    $tmp = get_field('address', 2)[$fieldName];
    if (!empty( $tmp )) {
      $result = $result . $tmp . $sep;
    }
  }
  return substr($result, 0, -strlen($sep));
}

function get_page_title($page) {
  // print_r($page);
  // echo $page;
  $title = get_field('page_title', $page);
  if (!$title) $title = get_the_title($page);
  return $title;
}

function get_section_title($category) {
  if (is_numeric($category)) $category = get_category($category);
  $title = get_field('section_title', $category);
  if (!$title) $title = $category -> name;
  return $title;
}

function get_thumbnail_url() {
  if (has_post_thumbnail()) {
    $url = get_the_post_thumbnail_url();
  } else {
    $url =  IMG_DIR . '/img-not-found-stub.png';
  }
  return $url;
}

function post_is_in_descendant_category( $cats, $_post = null ){
	foreach ( (array) $cats as $cat ) {
		// get_term_children() accepts integer ID only
		$descendants = get_term_children( (int) $cat, 'category' );
		if( $descendants && in_category( $descendants, $_post ) )
			return true;
	}
	return false;
}

add_action('wp_enqueue_scripts', function(){
  // wp_enqueue_style( PREFIX.'wp-theme', get_stylesheet_uri() );
  wp_enqueue_style( PREFIX.'vendor', CSS_DIR.'/vendor.css' );
  wp_enqueue_style( PREFIX.'common', CSS_DIR.'/common.css' );
  
  if(is_front_page()) wp_enqueue_style( PREFIX.'main', CSS_DIR.'/main.css' );
  if(is_page_template('page-about_me.php')) wp_enqueue_style( PREFIX.'about_me', CSS_DIR.'/about_me.css' );
  if(is_page_template('page-articles.php')) wp_enqueue_style( PREFIX.'articles', CSS_DIR.'/articles.css' );
  if(is_single()) wp_enqueue_style( PREFIX.'articles', CSS_DIR.'/articles.css' );
  if(is_page_template('page-contacts.php')) wp_enqueue_style( PREFIX.'contacts', CSS_DIR.'/contacts.css' );
  if(is_page_template('page-services.php')) wp_enqueue_style( PREFIX.'services', CSS_DIR.'/services.css' );

  wp_enqueue_script( PREFIX.'init', LIBS_DIR . '/init.js' );
  wp_add_inline_script( PREFIX.'init', 'window.paths = {libs: "'.LIBS_DIR.'", script: "'.JS_DIR.'", img: "'.IMG_DIR.'"}', 'before' );
  $address = getAddress(['city', 'street'], ', ');
  wp_add_inline_script( PREFIX.'init', "window.data = {address:  '{$address}'}" , 'before' );
  
  wp_enqueue_script( PREFIX.'vendor', JS_DIR.'/vendor.js' );
  wp_enqueue_script( PREFIX.'common', JS_DIR.'/common.js' );
  wp_enqueue_script( PREFIX.'main', JS_DIR.'/main.js', ['vendor', 'common'] );
  
  $yandexMapKey = (get_field('map', 2)['yandex_map_key']);
  wp_enqueue_script('yandex_map', 'https://api-maps.yandex.ru/2.1/?apikey='. $yandexMapKey .'&lang=ru_RU', null, false, true);  
  wp_enqueue_script('ymap', JS_DIR.'/ymap.js', ['yandex_map'], false, true);
});