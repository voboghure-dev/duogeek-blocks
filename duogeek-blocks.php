<?php
/**
 * Plugin Name: DuoGeek Blocks
 * Plugin URI: https://duogeek.ca
 * Description: Gutenberg Blocks to help you with the new WordPress block editor.
 * Author: Voboghure
 * Author URI: https://voboghure.com
 * Version: 0.1.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: dg-blocks
 *
 * @package DuoGeek Gutenberg Blocks
 */

/**
 * Exit if accessed directly
 */
if (!defined('ABSPATH')) {exit;}

/**
 * To ensure no conflicts with DuoGeek Gutenberg Blocks, we check to see
 * if this function exists before bootstrapping the rest of the plugin.
 */
if (!function_exists('dggb_main_plugin_file')) {
    /**
     * Returns the full path and filename of the main DuoGeek Gutenberg Blocks plugin file.
     *
     * @return string
     */
    function dggb_main_plugin_file()
    {
        return __FILE__;
    }

    // Load the rest of the plugin.
    require_once 'loader.php';
}
