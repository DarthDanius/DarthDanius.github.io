<?php
/*
Template Name: Статьи
*/
get_header() ?>

<div class="block-title section">
  <div class="block-title__cont section__cont fixed-container">
    <h1 class="block-title__title title title_section title_section_left">
      <?php
        $page = 115;
        echo get_page_title($page);
      ?>
    </h1>
  </div>
</div>



<?php
$category = 5; //статьи
$sub_cats = get_categories(
  array(
    'child_of' => $category,
    'hide_empty' => 0
  )
);

foreach ($sub_cats as $cat) { ?>
  <section class="section">
    <div class="section__cont fixed-container">
      <h3 id="<?php echo 'section-'.$cat->cat_ID ?>" class="section__title title title_subsection"><?php echo get_section_title($cat) ?></h3>

      <?php
      $posts = get_posts(array(
        'numberposts' => -1,
        'category'    => $cat->cat_ID,
        'orderby'     => 'date',
        'order'       => 'DESC',
        'post_type'   => 'post',
        'suppress_filters' => true
      ));

      echo '<ul class="article-cards">';

      foreach ($posts as $post) {
        setup_postdata($post); ?>

        <li class="article-cards__article">
          <div class="articles__img-cont" style="background-image: url(<?php echo get_thumbnail_url() ?>);"></div>
          <h4 class="articles__title"> <?php the_title(); ?></h4>
          <div class="articles__text-group">
            <div class="articles__text-cont"><?php the_excerpt() ?></div>
            <a href="<?php the_permalink() ?>" class="articles__link link link_next">Читать далее</a>
          </div>
        </li>

      <?php } ?>
      </ul>
    </div>
  </section>
<?php
}
?>

<section class="section-advice">
  <div class="section-advice__cont section__cont fixed-container">

    <h3 class="section-advice__title title title_subsection"><span class="title__marker">Получите консультацию</span><br />по Вашему вопросу</h3>

    <div id="form_advice" class="section-advice__form form form_advice">
      <?php echo do_shortcode('[contact-form-7 id="136" title="Заказать консультацию"]') ?>
    </div>

  </div>
</section>

<?php get_footer() ?>