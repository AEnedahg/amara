<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class VerifyPasswordResetCodeController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'string', 'size:6'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => 'No account was found with this email address.',
            ]);
        }

        if (
            ! $user->password_reset_code_expires_at ||
            $user->password_reset_code_expires_at->isPast()
        ) {
            throw ValidationException::withMessages([
                'code' => 'This code has expired. Please request a new one.',
            ]);
        }

        if ($user->password_reset_code !== $request->code) {
            throw ValidationException::withMessages([
                'code' => 'Invalid password reset code.',
            ]);
        }

        return response()->json([
            'message' => 'Code verified successfully.',
        ]);
    }
}
