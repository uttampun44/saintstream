<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function store(Request $request)
    {

       try {
         $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed'
          ]);

         

          User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
          ]);

        return response()->json([
           'status' => true,
           'message' => 'User Created Successfully'
        ], 201);
       } catch (\Throwable $th) {
         Log::error($th->getMessage());

         return response()->json([
              'message' => "Internal server error"
         ], 500);
       }
    }


    public function login()
    {

    }
}
