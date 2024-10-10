<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movie extends Model
{
    protected $table = "movies";
    protected $fillable = ['title', 'release_date', 'cast', 
    'description', 'image_thumbnail', 'video_url', 'genre_id', 'language_id'];

    use HasFactory;
}
