<?php
    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
	      $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

        $options = array("opt-1", "opt-2", "opt-3", "opt-4", "opt-5", "opt-6");
        $interests = "";
        foreach ($options as &$option) {
            if ( $_POST[$option]) {
              $interests .= "+ " . $_POST[$option] . "\n";
            }
        }
        // Check that data was sent to the mailer.
        if ( empty($name) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Hubo un problema con el envío de tu mensaje, llena la forma e intenta de nuevo.";
            exit;
        }
        // Set the recipient email address.
        $recipient = "hola@radian.mx, heber@radian.mx, jaime@radian.mx";
         // Set the email subject.
        $subject = "Contacto de $name. Web RADIAN";
        // Build the email content.
        $email_content = "Nombre: $name\n\n";
        $email_content .= "E-mail: $email\n\n";
        if ( !empty($interests) ) {
            $email_content .= "Intereses: \n$interests";
        }
        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "¡Gracias! Tu mensaje ha sido enviado.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "¡Nooo! Algo salió mal y no pudimos enviar tu mensaje.";
        }
    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Hubo un problema con el envío de tu mensaje, por favor intenta de nuevo.";
    }
?>
