<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordResetCodeMail extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        public string $code
    ) {
    }

    public function build()
    {
        return $this
            ->subject('Your Password Reset Code')
            ->view('emails.password-reset-code');
    }
}
