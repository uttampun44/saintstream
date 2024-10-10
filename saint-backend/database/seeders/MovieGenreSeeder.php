<?php

namespace Database\Seeders;

use App\Models\MovieGenre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieGenreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movie_categories = config('moviegenres');

        foreach ($movie_categories as $category) {
           MovieGenre::create([
             'genre' => $category['genre'],
             'genre_slug' => $category['genre_slug']
           ]);
        }
    }
}
