<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package advokatryazanov
 */

?>

<footer class="wrapper-footer">
      <div class="section-footer footer fixed-container">

        <ul class="footer__meta meta">

          <li class="meta__item meta__item_map">
            <div class="meta__map map">
              <div id="map" class="map__cont"></div>
              <?php 
                wp_enqueue_script('yandex_map');
                wp_enqueue_script('ymap');
              ?>
            </div>
          </li>

          <li class="meta__item meta__item_dummy">
          </li>

          <li class="meta__item meta__item_social">
            <ul class="footer__icon-social icon-social icon-social_footer">

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
          </li>

          <li class="meta__item meta__item_service">
            <h5 class="meta__title">
              <?php echo mb_strtoupper(get_category(9)->name); ?>
            </h5>

            <?php
              $sub_cats = get_categories(
                array(
                'child_of' => 9,
                'hide_empty' => 0
                )
              );
              
              if( $sub_cats ){
                foreach( $sub_cats as $cat ){
                  echo '<a href="'; echo get_page_link(119).'#section-'.$cat->cat_ID; echo '" class="meta__text link">';
                  $result = get_field('service_description', $cat);
                  $result =  str_replace('<br/>', ' ', $result);
                  echo str_replace('<br />', ' ', $result);
                  echo '</a>';
                };
              };
            ?>
          </li>

          <li class="meta__item meta__item_address">
            <h5 class="meta__title">АДРЕС</h5>
            <a href="" class="link_cont" id="address_link" target="_blank">
              <p class="meta__text link"><?php echo get_field('address', 2)['city'] ?>,</p>
              <p class="meta__text link"><?php echo get_field('address', 2)['street'] ?>,</p>
              <p class="meta__text link"><?php echo get_field('address', 2)['room_number'] ?></p>
            </a>
          </li>

          <li class="meta__item meta__item_contacts">
            <h5 class="meta__title">КОНТАКТЫ</h5>
            <a class="meta__text link" href="tel:+<?php echo get_field('phons', 2)['tel-01']['value'];?>"><?php echo get_field('phons', 2)['tel-01']['string'];?></a>
            <a class="meta__text link" href="mailto:<?php the_field('mail', 2);?>"><?php the_field('mail', 2);?></a>
            <a class="meta__text link meta__text_mobile" href="#">
              <?php echo getAddress(['city', 'street', 'room_number'], ', ') ?>
            </a>
          </li>

        </ul>

        <ul class="footer__other">

          <li class="footer__other-item">
            <?php echo get_field('copyright', 2) ?>
          </li>

          <li class="footer__other-item">
            <p class="footer__text footer__text_info"><?php echo get_field('meta', 2)['year'] ?></p>
            <a class="footer__text footer__text_mail link"><?php echo get_field('meta', 2)['mail'] ?></a>
          </li>

        </ul>
      </div>
    </footer>

    <a href="#heder-main" id="ui__arrow-up" class="ui__arrow-up ui pulse">
      <img class="ui__icon" src="<?php echo IMG_DIR ?>/ui_arrow_up.png" alt="ui__arrow-up">
    </a>

	</div>
  <?php wp_footer() ?>
</body>
</html>