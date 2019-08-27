<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Booking;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $result = Booking::all();
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
        $booking = new Booking;
        $booking->customer_email = $request->customerEmail;
        $booking->customer_name = $request->customerName;
        $booking->date_end = $request->dateEnd;
        $booking->date_start = $request->dateStart;
        $booking->room_id = $request->roomId;
        $booking->total_nights = $request->totalNights;
        $booking->total_price = $request->totalPrice;
        $booking->user_id = $request->userId;
        $booking->save();
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
        $booking = Booking::find($id);
        return $booking;
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
        $booking = Booking::find($id);
        $booking->customer_email = $request->customerEmail;
        $booking->customer_name = $request->customerName;
        $booking->date_end = $request->dateEnd;
        $booking->date_start = $request->dateStart;
        $booking->room_id = $request->roomId;
        $booking->total_nights = $request->totalNights;
        $booking->total_price = $request->totalPrice;
        $booking->user_id = $request->userId;
        $booking->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $booking = Booking::find($id);
        $booking->delete();
    }
}
