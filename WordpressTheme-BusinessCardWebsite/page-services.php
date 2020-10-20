<?php 
/*
Template Name: Юридические услуги
*/


get_header();
?>

  <div class="block-title section">
    <div class="block-title__cont section__cont fixed-container">
      <h1 class="block-title__title title title_section title_section_left">
        <?php 
          $page = 119;
          echo get_page_title($page)
        ?>
      </h1>
    </div>
  </div>

<?php
$categories = [10, 11, 12];

foreach( $categories as $category) { ?>

  <section class="section">
    <div class="section__cont fixed-container">

      <h3 id="<?php echo 'section-'.$category ?>" class="section__title title title_subsection">
        <?php echo get_section_title($category); ?>
      </h3>

      <ul class="section__list cards">
  <?php

  $posts = get_posts( array(
    'numberposts' => -1,
    'category'    => $category,
    'orderby'     => 'date',
    'order'       => 'DESC',
    'post_type'   => 'post',
    'suppress_filters' => true,
  ) );

  foreach( $posts as $post ){
    setup_postdata($post); ?>

        <li class="cards__item">
          <a class="cards__title" style="display: block;" href="<?php the_permalink() ?>">
            <?php the_title() ?>
         </a>
          <div class="cards__text-group" style="display: none;">
            <?php the_excerpt() ?>
          </div>
        </li>

    <?php
  } ?>

  </ul>

</div>
</section>
<?php
} ?>

  <section class="section">
    <div class="section__cont fixed-container">

    <?php
      $category = 13;
      $category_title = get_field('section_title', get_category($category));
      if (!$category_title) $category_title = get_category($category)->name;
    ?>

      <h3 class="section__title title title_subsection">
        <?php
          echo $category_title;
        ?>
      </h3>
          

        <div class="section__text-group">
        <?php
          $posts = get_posts( array(
            'numberposts' => -1,
            'category'    => $category,
            'orderby'     => 'date',
            'order'       => 'ASC',
            'post_type'   => 'post',
            'suppress_filters' => true,
          ) );
          
          foreach( $posts as $post ){
            setup_postdata($post); ?>
            
          <h4 style="color: white;"><?php the_title() ?></h4>
          <h5 style="color: white; margin-bottom: 5px;"><?php the_content() ?></h5>

            <?php
          }
        ?>

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
          $posts = get_posts( array(
            'numberposts' => -1,
            'category'    => $category,
            'orderby'     => 'date',
            'order'       => 'ASC',
            'post_type'   => 'post',
            'suppress_filters' => true,
          ) );
          
          foreach( $posts as $post ){
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

    <section class="section-advice">
      <div class="section-advice__cont section__cont fixed-container">

        <h3 class="section-advice__title title title_subsection"><span class="title__marker">Получите консультацию</span><br/>по Вашему вопросу</h3>

        <div id="form_advice" class="section-advice__form form form_advice">
          <?php echo do_shortcode('[contact-form-7 id="136" title="Заказать консультацию"]') ?>
        </div>
      
      </div>
    </section>

<?php get_footer() ?>