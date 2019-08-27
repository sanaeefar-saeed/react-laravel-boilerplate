<?php

use Illuminate\Database\Seeder;

class HotelsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
/*        DB::table('hotels')->insert([
            'name' => Str::random(10),
            'address' => Str::random(20),
            'city' => Str::random(10),
            'state' => Str::random(10),
            'country' => Str::random(10),
            'zip_code' => Str::random(5),
            'phone_number' => Int::random(10),
            'email' => Str::random(10).'@gmail.com',
            'image' => Str::random(5),
        ]);*/

        \App\Hotel::insert([
            'name' => 'radison blue',
            'address' => 'Tbilisi',
            'city' => 'Tbilisi',
            'state' => 'Tbilisi',
            'country' => 'Tbilisi ',
            'zip_code' => '00170',
            'phone_number' => '+995568830876',
            'email' => 'info@radisonblue.com',
            'images' => 'http://agenda.ge/files/news/002/1440141194.jpg',
        ]);
    }
}
