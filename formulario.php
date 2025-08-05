
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // HONEYPOT: si este campo oculto se rellena, es un bot
    if (!empty($_POST["form_honeypot"])) {
        echo "Acceso denegado.";
        exit;
    }

    // Recoger y limpiar campos
    $nombre   = trim($_POST["nombre"] ?? '');
    $email    = trim($_POST["email"] ?? '');
    $telefono = trim($_POST["telefono"] ?? '');
    $empresa  = trim($_POST["empresa"] ?? '');
    $mensaje  = trim($_POST["mensaje"] ?? '');

    // Validaciones
    if (
        empty($nombre) || empty($email) || empty($telefono) ||
        empty($empresa) || empty($mensaje)
    ) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    // Validación de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email no válido.";
        exit;
    }

    // Validación de longitud
    if (strlen($nombre) > 100 || strlen($empresa) > 100 || strlen($telefono) > 20 || strlen($mensaje) > 2000) {
        echo "Alguno de los campos excede la longitud permitida.";
        exit;
    }

    // Dirección de destino
    $destinatario = "coddit@coddit.es";
    $asunto = "Nuevo mensaje desde el formulario de contacto";

    // Evitar inyecciones de encabezado
    $email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);

    // Crear el mensaje
    $contenido = "Has recibido un nuevo mensaje desde la web:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Empresa: $empresa\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "X-Mailer: PHP/" . phpversion();

    // Enviar correo
    file_put_contents("log.txt", $contenido, FILE_APPEND);
echo "Mensaje guardado en log.txt";

} else {
    echo "Método no permitido.";
}
?>
