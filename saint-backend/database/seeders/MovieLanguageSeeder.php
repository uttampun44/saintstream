<?php

namespace Database\Seeders;

use App\Models\MovieLanguage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MovieLanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $movieLanguage = config("movielanguages");
        
        foreach ($movieLanguage as $language) {
            MovieLanguage::create([
              'language' => $language['language'],
              'language_slug' => $language['language_slug']
            ]);
        }
    }
}
