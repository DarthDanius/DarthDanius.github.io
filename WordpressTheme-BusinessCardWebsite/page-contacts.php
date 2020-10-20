<?php
/*
Template Name: Контакты
*/


get_header();
the_post();
// $page = 117;
 ?>

<section class="section-about-me">
  <div class="section-about-me__cont fixed-container">

    <h1 class="section-about-me__title title title_section title_section_left">
        <?php echo get_page_title(null); ?>
    </h1>

      <div class="section-about-me__group">
        <div class="section-about-me__avatar frame">
        <img class="section-about-me__avatar-image frame__image" src="
          <?php 
            if (has_post_thumbnail()) {
              the_post_thumbnail_url();
            } else {
              echo IMG_DIR . '/img-not-found-stub.png';
            }
          ?>
        " alt="avatar" />
        </div>

        <div class="section-about-me__article">
          <div class="section-about-me__article-body">
            <?php the_content() ?>
          </div>
        </div>
      </div>
    <?php
    ?>

  </div>
</section>

<section class="section-articles">
  <div class="section-articles__cont fixed-container">
    <h2 class="section-articles__title title title_section">
      <?php echo get_category(5)->name ?></h2>
    <ul class="section-articles__articles articles">

      <?php
      $posts = get_posts(array(
        'numberposts' => 3,
        'category_name'    => 'articles',
        'orderby'     => 'date',
        'order'       => 'ASC',
        'post_type'   => 'post',
        'suppress_filters' => true
      ));

      foreach ($posts as $post) {
        setup_postdata($post);
      ?>
        <li class="articles__article articles__article_new">
          <div class="articles__img-cont" style="background-image: url(
                    <?php
                    if (has_post_thumbnail()) {
                      the_post_thumbnail_url();
                    } else {
                      echo IMG_DIR . '/img-not-found-stub.png';
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

<section class="section-advice">
  <div class="section-advice__cont section__cont fixed-container">

    <h3 class="section-advice__title title title_subsection"><span class="title__marker">Получите консультацию</span><br />по Вашему вопросу</h3>

    <div id="form_advice" class="section-advice__form form form_advice">
      <?php echo do_shortcode('[contact-form-7 id="136" title="Заказать консультацию"]') ?>
    </div>

  </div>
</section>

<?php get_footer() ?>

