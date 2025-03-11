<?php
// Mostrar mensaje de "Hola"
echo "<h1>Hola!</h1>";

// Función para listar archivos en el directorio actual
function listarArchivos($dir) {
    // Abrir el directorio
    if ($handle = opendir($dir)) {
        echo "<ul>";
        // Leer archivos
        while (($file = readdir($handle)) !== false) {
            // Excluir las carpetas '.' y '..'
            if ($file != "." && $file != "..") {
                // Mostrar el archivo como un enlace
                echo "<li><a href='$dir/$file' target='_blank'>$file</a></li>";
            }
        }
        echo "</ul>";
        // Cerrar el directorio
        closedir($handle);
    }
}

// Llamar a la función para listar archivos en el directorio actual
listarArchivos(".");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
