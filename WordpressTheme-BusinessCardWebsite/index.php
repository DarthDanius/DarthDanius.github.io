<?php get_header() ?>

    <section class="section-about-me">
      <div class="section-about-me__cont fixed-container">
        <h2 class="section-services__title title title_hide">Обо мне</h2>
        <div class="section-about-me__avatar">
          <img class="section-about-me__avatar-image" src="<?php echo get_field('page-main_avatar')['url'] ?>" alt="<?php echo get_field('page-main_avatar')['alt'] ?>" />
        </div>
        <div class="section-about-me__article">
          <div class="section-about-me__article-body">
            
            <?php
              $page = 113;
              $post = get_post($page);
              setup_postdata($post);
              echo the_excerpt();
            ?>
          
          </div>
          <a class="section-about-me__article-link link link_next" href="<?php echo get_page_link($post) ?>">Читать далее</a>
        </div>
      </div>
    </section>

    <section class="section-services">
      <div class="section-services__cont fixed-container">
        <h2 class="section-services__title title title_section">
          <a class="" href="<?php the_permalink(119) ?>">
            <?php echo get_category(9)->name ?>
          </a>
        </h2>
        <ul class="section-services__service-list services">
          
        <?php
          $sub_cats = array(
            get_category(10),
            get_category(11),
            get_category(12)
          );
          if( $sub_cats ){
            foreach( $sub_cats as $cat ){
              $image_uri = get_field('service_icon', $cat);
              ?>
              <li class="services__item" style="background-image: url(<?php
                $href = get_field('service_img', $cat);
                if ($href) {
                  echo $href;
                } else {
                  echo IMG_DIR.'/img-not-found-stub.png';
                }
              ?>)">
                <h4 class="services__title">
                  <?php echo '<a href="'; echo get_page_link(119).'#section-'.$cat->cat_ID; echo '" class="">'; ?>
                    <?php echo get_field('service_description', $cat); ?>
                  </a>
                  <img alt="service-icon" class="services__icon" style="max-width: 120px;" src="<?php echo $image_uri; ?>" />
                </h4>
              </li>
              <?php
            };
          };
        ?>
          
        </ul>
      </div>
    </section>

    <section class="section-documents">
      <div class="section-documents__cont fixed-container">
        <h2 class="section-documents__title title title_section">
          <?php echo get_category(2)->name ?>
        </h2>
        <div class="section-documents__slider slider">
          <ul class="slider__cont" data-type="slider">

            <?php 
            $posts = get_posts( array(
              'numberposts' => 5,
              'category_name'    => 'slider_documents',
              'orderby'     => 'date',
              'order'       => 'ASC',
              'post_type'   => 'post',
              'suppress_filters' => true,
            ) );
            
            foreach( $posts as $post ){
              setup_postdata($post);
              ?>
                <li
                  class="section-documents__slide slider__slide"
                  data-type="image-cont"
                  <?php if (get_field('slider_bool_height_fixed')): ?>
                    style="
                      height: <?php the_field('slider_height') ?>px ;
                      background-color: <?php the_field('slider_background-color') ?>;
                    "
                  <?php endif; ?>
                >
                  <a class= "slider__image-link" href="<?php the_field('slider_img') ?>">
                    <img class="slider__image"
                      src="<?php the_field('slider_img') ?>"
                      alt="<?php the_title() ?>"
                      style="
                        object-fit: <?php echo get_field('slider_object-fit') ?>;
                      "
                    />
                  </a>
                </li>
              <?php
            }
            ?>
            
          </ul>
        </div>
      </div>
    </section>

    <section class="section-promo">
      <div class="section-promo__cont fixed-container">

        <h3 class="section-promo__title"><?php echo get_field('section-promo_title', 2) ?></span></h3>
        <?php echo do_shortcode( '[contact-form-7 id="105" title="Получить скидку"]' ) ?>

      </div>
    </section>

    <section class="section-articles">
      <div class="section-articles__cont fixed-container">
        <h2 class="section-articles__title title title_section">
          <a class="" href="<?php the_permalink(115) ?>">
            <?php echo get_category(5)->name ?></h2>
          </a>
        <ul class="section-articles__articles articles">

          <?php
            $posts = get_posts( array(
              'numberposts' => 3,
              'category_name'    => 'articles',
              'orderby'     => 'date',
              'order'       => 'DESC',
              'post_type'   => 'post',
              'suppress_filters' => true
            ) );
            
            foreach( $posts as $post ){
              setup_postdata($post);
              ?>
                <li class="articles__article articles__article_new">
                  <div
                    class="articles__img-cont"
                    style="background-image: url(
                    <?php
                    if (has_post_thumbnail()) {
                      the_post_thumbnail_url();
                    } else {
                      echo IMG_DIR.'/img-not-found-stub.png';
                    }
                    ?>
                    );">
                  </div>
                  <h4 class="articles__title"><?php the_title() ?></h4>
                  <div class="articles__text-group">
                    <div class="articles__text-cont"><?php the_excerpt() ?></div>
                    <a href="<?php the_permalink() ?>" class="articles__link link link_next">Читать далее</a>
                  </div>
                </li>
              <?php
            }
          ?>

        </ul>
      </div>
    </section>

    <div style="display:none" class="fancybox-hidden">
      <div id="contact_form_pop">
          <div id="form_advice" class="section-advice__form form form_advice">
            <?php echo do_shortcode('[contact-form-7 id="136" title="Заказать консультацию"]') ?>
          </div>

        <!-- </div> -->
      </div>
    </div>

    <?php get_footer() ?>