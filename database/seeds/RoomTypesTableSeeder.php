<?php

use Illuminate\Database\Seeder;

class RoomTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\RoomType::insert([
            ['name' => 'Standard'],
            ['name' => 'Deluxe'],
            ['name' => 'Superior'],
        ]);
    }
}
