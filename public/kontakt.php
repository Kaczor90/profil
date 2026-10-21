<?php
// Obsługa formularza wyceny. Działa na zwykłym hostingu z PHP (funkcja mail()).
// Ustaw adres, na który mają przychodzić zapytania:
const RECIPIENT = 'ewelina.bernaciak@wp.pl';
const FROM      = 'formularz@profil-okna.com.pl'; // adres w domenie strony – zmniejsza ryzyko trafienia do spamu

header('Content-Type: application/json; charset=utf-8');

function respond(bool $ok, string $error = '', int $code = 200): void {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'error' => $error], JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Nieprawidłowe żądanie.', 405);
}

// pułapka na boty – prawdziwy użytkownik nie widzi tego pola
if (!empty($_POST['website'])) {
    respond(true);
}

$clean = static fn(string $key, int $max = 200): string =>
    trim(mb_substr(str_replace(["\r", "\n"], ' ', (string)($_POST[$key] ?? '')), 0, $max));

$name    = $clean('name', 100);
$phone   = $clean('phone', 40);
$email   = $clean('email', 120);
$topic   = $clean('topic', 120);
$message = trim(mb_substr((string)($_POST['message'] ?? ''), 0, 3000));
$consent = !empty($_POST['consent']);

if (strlen(preg_replace('/\D/', '', $phone)) < 9) {
    respond(false, 'Podaj poprawny numer telefonu.', 422);
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(false, 'Adres e-mail wygląda na niepoprawny.', 422);
}
if (!$consent) {
    respond(false, 'Zaznacz zgodę na przetwarzanie danych.', 422);
}

$subject = 'Zapytanie ze strony – ' . ($topic !== '' ? $topic : 'wycena');
$body = "Nowe zapytanie ze strony profil-okna.com.pl\n\n"
      . "Imię: " . ($name ?: '–') . "\n"
      . "Telefon: $phone\n"
      . "E-mail: " . ($email ?: '–') . "\n"
      . "Temat: " . ($topic ?: '–') . "\n\n"
      . "Wiadomość:\n" . ($message ?: '–') . "\n\n"
      . "Zgoda RODO: tak\n"
      . "Wysłano: " . date('Y-m-d H:i') . "\n";

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: Strona Profil <' . FROM . '>',
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(
    RECIPIENT,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $body,
    implode("\r\n", $headers)
);

if (!$sent) {
    respond(false, 'Nie udało się wysłać wiadomości. Zadzwoń do nas – chętnie pomożemy.', 500);
}
respond(true);
