<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VerifyCodeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'six_digit_code' => ['required', 'string', 'size:6'],
        ]);

        $email = session('pending_verification_email');

        if (! $email) {
            throw ValidationException::withMessages([
                'six_digit_code' => 'Your verification session expired. Please sign up again.',
            ]);
        }

        $user = User::where('email', $email)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'six_digit_code' => 'User not found.',
            ]);
        }

        if (
            $user->verification_code_expires_at &&
            $user->verification_code_expires_at->isPast()
        ) {
            throw ValidationException::withMessages([
                'six_digit_code' => 'This code has expired. Please request a new one.',
            ]);
        }

        if ($user->verification_code !== $request->six_digit_code) {
            throw ValidationException::withMessages([
                'six_digit_code' => 'Invalid verification code.',
            ]);
        }

        $user->update([
            'email_verified_at' => now(),
            'verification_code' => null,
            'verification_code_expires_at' => null,
        ]);

        session()->forget('pending_verification_email');

        return response()->json([
            'message' => 'Email verified successfully.',
        ]);
    }
}
