<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Booking;
use Faker\Generator as Faker;

$factory->define(Booking::class, function (Faker $faker) {

    $startingDate = \Carbon\Carbon::createFromTimestamp($faker->dateTimeBetween($startDate = '+1 days', $endDate = '+1 month')->getTimeStamp()) ;

    $endingDate= \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $startingDate)->addDays( $faker->numberBetween( 1, 7 ) );

    $dateDiff = $endingDate->diffInDays($startingDate);
    return [
        'room_id' => $faker->numberBetween( 1, 10 ),
        'date_start' => $startingDate->toDateString(),
        'date_end' => $endingDate->toDateString(),
        'customer_name' => $faker->firstName. ' ' . $faker->lastName,
        'customer_email' => $faker->unique()->safeEmail,
        'total_nights' => $dateDiff,
        'total_price' => $faker->numberBetween( 100, 200 ),
        'user_id' => $faker->unique()->numberBetween( 1, 100 )
    ];
});
