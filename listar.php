<?php
// listar.php
header("Content-Type: text/html; charset=UTF-8");

echo "<h1>Hola!</h1>";

function listarArchivos($dir) {
    if ($handle = opendir($dir)) {
        echo "<ul>";
        while (($file = readdir($handle)) !== false) {
            if ($file != "." && $file != "..") {
                echo "<li><a href='$dir/$file' target='_blank'>$file</a></li>";
            }
        }
        echo "</ul>";
        closedir($handle);
    }
}

listarArchivos(".");
?>
