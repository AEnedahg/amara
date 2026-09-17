<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ResendCodeController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\VerifyCodeController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\VerifyPasswordResetCodeController;
use App\Http\Controllers\Auth\ResetPasswordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [SignupController::class, 'store']);
Route::post('/verify-code', [VerifyCodeController::class, 'store'])->middleware('throttle:5,1');
Route::post('/resend-code', [ResendCodeController::class, 'store'])->middleware('throttle:3,1');
Route::post('/login', [LoginController::class, 'store']);
Route::post('/forgot-password', [ForgotPasswordController::class, 'store']);
Route::post('/verify-password-reset-code', [
    VerifyPasswordResetCodeController::class,
    'store'
]);
Route::post('/reset-password', [
    ResetPasswordController::class,
    'store'
]);
