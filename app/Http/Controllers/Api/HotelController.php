<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Hotel;

class HotelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Hotel::all();
        return $result;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $hotel = new Hotel;
        $hotel->address = $request->hotelAddress;
        $hotel->city = $request->hotelCity;
        $hotel->country = $request->hotelCountry;
        $hotel->email = $request->hotelEmail;
        $hotel->name = $request->hotelName;
        $hotel->phone_number = $request->hotelPhoneNumber;
        $hotel->state = $request->hotelState;
        $hotel->zip_code = $request->hotelZipCode;
        $hotel->images = isset($request->images[0])?$request->images[0]:'';
        $hotel->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $hotel = Hotel::find($id);
        return $hotel;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $hotel = Hotel::find($id);
        $hotel->address = $request->hotelAddress;
        $hotel->city = $request->hotelCity;
        $hotel->country = $request->hotelCountry;
        $hotel->email = $request->hotelEmail;
        $hotel->name = $request->hotelName;
        $hotel->phone_number = $request->hotelPhoneNumber;
        $hotel->state = $request->hotelState;
        $hotel->zip_code = $request->hotelZipCode;
        $hotel->images = isset($request->images[0])?$request->images[0]:'';
        $hotel->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $hotel = Hotel::find($id);
        $hotel->delete();
    }
}
