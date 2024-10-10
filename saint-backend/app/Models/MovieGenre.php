<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieGenre extends Model
{
    protected $table= "movie_genres";
    protected $fillable = ["genre", "genre_slug"];

    use HasFactory;
}
