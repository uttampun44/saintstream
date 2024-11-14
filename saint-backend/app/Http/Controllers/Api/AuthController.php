<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Mail\PasswordResetMail;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;


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

    public function login(LoginRequest $request): JsonResponse
    {

        try {

            $credentials = $request->safe()->only(['email', 'password']);

            if (Auth::attempt($credentials)) {
                $user = Auth::user();

                if ($user instanceof \App\Models\User) {

                    return response()->json([
                        'status' => true,
                        'token' => $user->createToken('login_token')->plainTextToken,
                        'user' => $user,
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
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'User not authenticated'
            ]);
        }
        $user->currentAccessToken()->delete();

        return response()->json([
            'status' => true,
            'message' => 'successfully logout'
        ]);
    }

    public function forgetPassword(Request $request)
    {

        try {
            $validated =  $request->validate([
                'email' => 'required|email',
            ]);


            $email = $validated['email'];

            $user = User::where('email', $email)->exists();

            if (!$user) {
                return response()->json([
                    'message' => 'Email does not exists',
                    'status' => false,
                ], 500);
            }

            $token = DB::table('password_reset_tokens')->where('email', $email)->value('token');

            if (!$token) {
                $token = Str::random(60);
                DB::table('password_reset_tokens')->updateOrInsert(
                    [
                        'email' => $email,
                        'token' => $token,
                        'created_at' => Carbon::now()
                    ]
                );
            }


            Mail::to($email)->send(new PasswordResetMail($token, $email));

            return response()->json([
                'message' => 'Password reset email has been sent. Please check your inbox.',
                'status' => 'success',
            ], 200);
        } catch (\Throwable $th) {
            $th->getMessage();
            Log::error($th->getMessage());
        }
    }

    public function resetPassword(Request $request)
    {
        $validate =   $request->validate([
            'token' => 'required',
            'password' => 'required|string|confirmed',
        ]);

        try {
            $validToken = DB::table('password_reset_tokens')->where('token', $validate['token'])->first();

            if (!$validToken) {
                return response()->json([
                    'message' => 'Invalid token or email.',
                    'status' => false,
                ], 400);
            }



            User::Where('email', $validToken->email)->update([
                'password' => Hash::make($validate['password'])
            ]);

            DB::table('password_reset_tokens')
                ->where('token', $validToken->token)
                ->delete();

            return response()->json([
                'message' => 'New Password Created'
            ], 200);
        } catch (\Throwable $th) {
            Log::error('Error resetting password: ' . $th->getMessage());

            return response()->json([
                'message' => 'Internal Server'
            ], 500);
        }
    }
}
