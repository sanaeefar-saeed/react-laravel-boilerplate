<?php

use Illuminate\Database\Seeder;

class PriceListsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\PriceList::insert([
            ['room_type_id' => '1', 'price' => '100'],
            ['room_type_id' => '2', 'price' => '200'],
            ['room_type_id' => '3', 'price' => '300']
        ]);

    }
}
