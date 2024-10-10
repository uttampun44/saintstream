<?php

namespace Database\Factories;

use App\Models\Movie;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class MovieFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Movie::class;

    public function definition(): array
    {

        return [
           'title' => $this->faker->sentence(10),
           'release_date' => $this->faker->date,
           'cast' => implode(', ', [$this->faker->name(), $this->faker->name(), $this->faker->name()]),
           'description' => $this->faker->paragraph(),
           'image_thumbnail' => $this->faker->imageUrl(640, 480, 'movies', true),
           'video_url' => $this->faker->url,
           'genre_id' => $this->faker->numberBetween(1, 6),
           'language_id' => $this->faker->numberBetween(1, 8),
        ];
    }
}
