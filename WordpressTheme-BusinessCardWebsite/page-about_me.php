<?php
/*
Template Name: Обо мне
*/


get_header();
the_post();
// $page = 113;
?>

<section class="section-about-me">
  <div class="section-about-me__cont fixed-container">

      <h1 class="section-about-me__title title title_section title_section_left"><?php echo get_page_title(null) ?></h1>

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

  </div>
</section>

<section class="section-slider">
  <div class="section-slider__cont fixed-container">
    <h2 class="section-slider__title title title_hide">Документы</h2>
    <div class="section-slider__slider slider">
      <ul class="slider__cont" data-type="slider">

        <?php
        $posts = get_posts(array(
          'numberposts' => 5,
          'category_name'    => 'slider_documents',
          'orderby'     => 'date',
          'order'       => 'ASC',
          'post_type'   => 'post',
          'suppress_filters' => true,
        ));

        foreach ($posts as $post) {
          setup_postdata($post);
        ?>
          <li class="section-slider__slide slider__slide" data-type="image-cont" <?php if (get_field('slider_bool_height_fixed')) : ?> style="
                      height: <?php the_field('slider_height') ?>px ;
                      background-color: <?php the_field('slider_background-color') ?>;
                    " <?php endif; ?>>
            <a class="slider__image-link" href="<?php the_field('slider_img') ?>">
              <img class="slider__image" src="<?php the_field('slider_img') ?>" alt="<?php the_title() ?>" style="
                        object-fit: <?php echo get_field('slider_object-fit') ?>;
                      " />
            </a>
          </li>
        <?php
        }
        ?>

      </ul>
    </div>
  </div>
</section>

<section class="section-how-work section">
  <div class="section-how-work__cont section__cont fixed-container">

    <?php
    $category = 14;
    $category_title = get_field('section_title', get_category($category));
    if (!$category_title) $category_title = get_category($category)->name;
    ?>

    <h3 class="section-how-work__title title title_subsection">
      <?php
      echo $category_title;
      ?>
    </h3>

    <div class="section-how-work__graf graf">
      <ul class="graf__list">

        <?php
        $posts = get_posts(array(
          'numberposts' => -1,
          'category'    => $category,
          'orderby'     => 'date',
          'order'       => 'ASC',
          'post_type'   => 'post',
          'suppress_filters' => true,
        ));

        foreach ($posts as $post) {
          setup_postdata($post); ?>

          <li class="graf__item">
            <h4 class="graf__title"><?php the_title() ?></h4>
            <?php the_content() ?>
          </li>

        <?php
        }
        ?>
      </ul>
    </div>
  </div>
</section>

<section class="section-advice section">
  <div class="section-advice__cont fixed-container section__cont">

    <h3 class="section-advice__title title title_subsection"><span class="title__marker">Получите консультацию</span><br />по Вашему вопросу</h3>

    <div id="form_advice" class="section-advice__form form form_advice">
      <?php echo do_shortcode('[contact-form-7 id="136" title="Заказать консультацию"]') ?>
    </div>

  </div>
</section>

<?php get_footer() ?>