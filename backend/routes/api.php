<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ResendCodeController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\VerifyCodeController;
use App\Http\Controllers\Auth\LoginController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [SignupController::class, 'store']);
Route::post('/verify-code', [VerifyCodeController::class, 'store'])->middleware('throttle:5,1');
Route::post('/resend-code', [ResendCodeController::class, 'store'])->middleware('throttle:3,1');
Route::post('/login', [LoginController::class, 'store']);