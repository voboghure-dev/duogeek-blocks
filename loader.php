<?php
/**
 * Bootstraps the DuoGeek Gutenberg Blocks plugin.
 *
 * @package DuoGeek Gutenberg Blocks
 */

/**
 * Initialize the blocks
 */
function dggb_loader()
{
    $dggb_src_dir = plugin_dir_path(__FILE__) . 'src/';
    $dggb_dist_dir = plugin_dir_path(__FILE__) . 'dist/';

    /**
     * Load the blocks functionality
     */
    require_once $dggb_dist_dir . 'init.php';

    /**
     * Load Container Block PHP
     */
    require_once $dggb_src_dir . 'blocks/block-container/index.php';

    /**
     * Load Social Block PHP
     */
    require_once $dggb_src_dir . 'blocks/block-sharing/index.php';

    /**
     * Load Post Grid PHP
     */
    require_once $dggb_src_dir . 'blocks/block-post-grid/index.php';
}
add_action('plugins_loaded', 'dggb_loader');

/**
 * Load the plugin textdomain
 */
function dggb_init()
{
    load_plugin_textdomain('dggb-blocks', false, basename(dirname(__FILE__)) . '/languages');
}
add_action('init', 'dggb_init');

/**
 * Add image sizes
 */
function dggb_image_sizes()
{
    // Post Grid Block.
    add_image_size('dggb-post-grid-landscape', 600, 400, true);
    add_image_size('dggb-post-grid-square', 600, 600, true);
}
add_action('after_setup_theme', 'dggb_image_sizes');
