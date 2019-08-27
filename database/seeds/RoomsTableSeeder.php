<?php

use Illuminate\Database\Seeder;

class RoomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Room::insert([
            ['name' => 'A101', 'hotel_id' => '1', 'room_type_id' => '1', 'images' => 'http://www.starplazadagupan.com/wp-content/uploads/2012/07/RoomL-Junior.jpg'],
            ['name' => 'B202', 'hotel_id' => '1', 'room_type_id' => '2', 'images' => 'http://www.starplazadagupan.com/wp-content/uploads/2012/07/RoomL-Junior.jpg'],
            ['name' => 'C303', 'hotel_id' => '1', 'room_type_id' => '3', 'images' => 'http://www.starplazadagupan.com/wp-content/uploads/2012/07/RoomL-Junior.jpg'],
            ['name' => 'A110', 'hotel_id' => '1', 'room_type_id' => '4', 'images' => 'http://www.starplazadagupan.com/wp-content/uploads/2012/07/RoomL-Junior.jpg'],
            ['name' => 'A111', 'hotel_id' => '1', 'room_type_id' => '5', 'images' => 'http://www.starplazadagupan.com/wp-content/uploads/2012/07/RoomL-Junior.jpg']
        ]);

    }
}
