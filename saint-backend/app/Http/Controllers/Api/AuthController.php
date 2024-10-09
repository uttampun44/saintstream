<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request): JsonResponse
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

    public function login(Request $request): JsonResponse
    {

        try {
          
            $credentials = $request->validate([
                'email' => 'required',
                'password' => 'required'
            ]);

            if (Auth::attempt($credentials)) {
                $user = Auth::user();

                if ($user instanceof \App\Models\User) {

                    return response()->json([
                        'status' => true,
                        'token' => $user->createToken('login_token')->plainTextToken,
                        'token_type' => 'bearer',
                        'message' => 'Successfull Login'
                    ], 200);
                }
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Email or Password not found'
                ], 401);
            }
        } catch (\Throwable $th) {

            Log::error($th->getMessage());

            return response()->json([
               'status' => false,
               'message' => "Internal Serval Error"
            ], 500);
        }
    }

    public function logout(Request $request): JsonResponse
    {

        return response()->json([]);
    }
}
