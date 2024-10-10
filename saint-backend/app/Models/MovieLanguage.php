<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MovieLanguage extends Model
{
    protected $table = "movie_languages";
    protected $fillable = ["language", "language_slug"];
    use HasFactory;
}
