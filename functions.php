<?php
function mstrade_register_assets() {
    get_template_directory_uri() . '/style.css'

    wp_register_script(
        'scripts.js',
        get_template_directory_uri() . '/scripts.js'
    );

    wp_enqueue_script('mstrade-custom-script');
}

add_action('wp_enqueue_scripts', 'mstrade_register_assets');

?>