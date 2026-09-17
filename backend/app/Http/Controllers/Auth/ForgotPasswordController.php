<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ForgotPasswordRequest;
use App\Mail\PasswordResetCodeMail;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class ForgotPasswordController extends Controller
{
    public function store(ForgotPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (! $user) {
            return response()->json([
                'message' => 'No account was found with this email address.',
            ], 404);
        }

        $code = str_pad(
            (string) random_int(0, 999999),
            4,
            '0',
            STR_PAD_LEFT
        );

        $user->update([
            'password_reset_code' => $code,
            'password_reset_code_expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(
            new PasswordResetCodeMail($code)
        );

        return response()->json([
            'message' => 'Password reset code sent successfully.',
        ]);
    }
}
