<?php

use Illuminate\Http\Request;

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

Route::get('hotels', 'Api\HotelController@index');
Route::get('hotels/{id}','Api\HotelController@edit');
Route::post('hotels', 'Api\HotelController@store');
Route::put('hotels/{id}','Api\HotelController@update');
Route::delete('hotels/{id}','Api\HotelController@destroy');

Route::get('room-types', 'Api\RoomTypeController@index');
Route::get('room-types/{id}','Api\RoomTypeController@edit');
Route::post('room-types', 'Api\RoomTypeController@store');
Route::put('room-types/{id}','Api\RoomTypeController@update');
Route::delete('room-types/{id}','Api\RoomTypeController@destroy');

Route::get('rooms', 'Api\RoomController@index');
Route::get('rooms/{id}','Api\RoomController@edit');
Route::post('rooms', 'Api\RoomController@store');
Route::put('rooms/{id}','Api\RoomController@update');
Route::delete('rooms/{id}','Api\RoomController@destroy');

Route::get('price-lists', 'Api\PriceListController@index');
Route::get('price-lists/{id}','Api\PriceListController@edit');
Route::post('price-lists', 'Api\PriceListController@store');
Route::put('price-lists/{id}','Api\PriceListController@update');
Route::delete('price-lists/{id}','Api\PriceListController@destroy');

Route::get('bookings', 'Api\BookingController@index');
Route::get('bookings/{id}','Api\BookingController@edit');
Route::post('bookings', 'Api\BookingController@store');
Route::put('bookings/{id}','Api\BookingController@update');
Route::delete('bookings/{id}','Api\BookingController@destroy');



