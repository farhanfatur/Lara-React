<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function() {
    Route::resource("post", "Api\PostController");
});

Route::group(['prefix' => 'auth'], function() {
    Route::post("/", "Api\AuthController@Login");
    Route::post('/logout', "Api\AuthController@Logout")->middleware('auth:sanctum');
});