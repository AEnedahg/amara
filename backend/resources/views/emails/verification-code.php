{{-- resources/views/emails/verification-code.blade.php --}}
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif;">
    <h2>Verify your email</h2>
    <p>Your verification code is:</p>
    <h1 style="letter-spacing: 8px;">{{ $code }}</h1>
    <p>This code will expire in 1 minute.</p>
</body>
</html>