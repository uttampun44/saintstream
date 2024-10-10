<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->date('release_date');
            $table->string('cast');
            $table->text('description');
            $table->string('image_thumbnail');
            $table->string('video_url');
            $table->foreignId('genre_id')->constrained('movie_genres')->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('language_id')->constrained('movie_languages')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};