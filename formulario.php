
<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!empty($_POST["form_honeypot"])) {
        echo "Acceso denegado.";
        exit;
    }

    $nombre   = trim($_POST["nombre"] ?? '');
    $email    = trim($_POST["email"] ?? '');
    $telefono = trim($_POST["telefono"] ?? '');
    $empresa  = trim($_POST["empresa"] ?? '');
    $mensaje  = trim($_POST["mensaje"] ?? '');

    if (empty($nombre) || empty($email) || empty($telefono) || empty($empresa) || empty($mensaje)) {
        echo "Todos los campos son obligatorios.";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Email no válido.";
        exit;
    }

    if (strlen($nombre) > 100 || strlen($empresa) > 100 || strlen($telefono) > 20 || strlen($mensaje) > 2000) {
        echo "Alguno de los campos excede la longitud permitida.";
        exit;
    }

    $destinatario = "coddit@coddit.es";
    $asunto = "Nuevo mensaje desde el formulario de contacto";

    $email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);

    $contenido = "Has recibido un nuevo mensaje desde la web:\n\n";
    $contenido .= "Nombre: $nombre\n";
    $contenido .= "Email: $email\n";
    $contenido .= "Teléfono: $telefono\n";
    $contenido .= "Empresa: $empresa\n\n";
    $contenido .= "Mensaje:\n$mensaje\n";

    $cabeceras = "From: $email\r\n";
    $cabeceras .= "Reply-To: $email\r\n";
    $cabeceras .= "X-Mailer: PHP/" . phpversion();

    if (mail($destinatario, $asunto, $contenido, $cabeceras)) {
        echo "Mensaje enviado correctamente.";
    } else {
        echo "Error al enviar el mensaje.";
    }
} else {
    echo "Método no permitido.";
}
?>
