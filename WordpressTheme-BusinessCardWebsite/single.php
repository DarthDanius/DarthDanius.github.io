<?php

// id 5 - статьи
// id 9 - услуги

if (in_category( 5 ) || post_is_in_descendant_category( 5 )) {
  include 'single-articles.php';
}
elseif (in_category( 9 ) || post_is_in_descendant_category( 9 )) {
  include 'single-services.php'; 
}

?>

