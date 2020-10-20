<?php get_header(); ?>

<div class="block-title section">
  <div class="block-title__cont section__cont fixed-container">
    <h2 class="block-title__title title title_section title_section_left">
    <?php
      $page = 115;
      echo get_page_title($page)
      ?>
    </h2>
  </div>
</div>

<section class="section-text">
  <div class="section-text__cont fixed-container">

    <h3 class="section-text__title title title_subsection"><span class="title__marker"><?php the_title() ?></span><br /></h3>

    <div class="section-text__article">
      <div class="section-text__article-body">

        <?php
        while (have_posts()) :
          the_post();

          get_template_part('template-parts/content', get_post_type());

          // the_post_navigation();

          // If comments are open or we have at least one comment, load up the comment template.
          // if (comments_open() || get_comments_number()) :
          //   comments_template();
          // endif;

        endwhile; // End of the loop.
        ?>

      </div>
    </div>

  </div>
</section>

<section class="section-articles">
  <div class="section-articles__cont fixed-container">
    <h3 class="section__title title title_subsection"><span class="title__marker">Интересное</span></h3>
    <ul class="section-articles__articles articles">

      <?php
      $page_uri = get_page_uri();
      $posts = get_posts(array(
        'numberposts' => 4,
        'category_name'    => 'articles',
        'orderby'     => 'date',
        'order'       => 'DESC',
        'post_type'   => 'post',
        'suppress_filters' => true
      ));
      $count = 1;

      foreach ($posts as $post) {
        if($post->post_name === $page_uri) continue;
        $count ++;
        if ($count > 4 ) break;
        setup_postdata($post);
      ?>
        <li class="articles__article articles__article_new">
          <div class="articles__img-cont" style="background-image: url(<?php echo get_thumbnail_url() ?>);"></div>
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