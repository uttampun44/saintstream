<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function store(SignUpRequest $request):JsonResponse
    {

        Log::error($request);
   
       try {
        $validate =  $request->validate();

        $validate['password'] = Hash::make($validate['password']);
       

        User::create($validate);

        return response()->json([
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
