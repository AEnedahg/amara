<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
    public function store(ResetPasswordRequest $request)
    {
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

        $user->update([
            'password' => Hash::make($request->password),
            'password_reset_code' => null,
            'password_reset_code_expires_at' => null,
        ]);

        return response()->json([
            'message' => 'Password reset successfully.',
        ]);
    }
}
