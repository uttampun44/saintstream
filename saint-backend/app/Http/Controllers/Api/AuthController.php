<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

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

        if(!$user)
        {
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
        $email =  $request->validate([
            'email' => 'required|email',
         ]);
 
         $user = User::where('email', $email)->exists();
 
         if(!$user)
         {
             return response()->json([
               'message' => 'Email does not exists',
               'status' => false,
             ], 404);
         }
 
         $status = Password::sendResetLink(['email' => $email]);
 
         if($status === Password::RESET_LINK_SENT)
         {
             Mail::send('reset', ['token' => $request->token], function (Message $message) use ($email) {
                 $message->subject('Reset Your Password');
                 $message->to($email);
             });
     
             return response()->json([
                 'message' => 'Password Reset Email Sent... Check Your Email',
                 'status' => 'success'
             ], 200);
         }else{
             return response()->json([
                 'message' => 'Failed to send reset link',
                 'status' => false
             ], 500);
         }
      } catch (\Throwable $th) {
        $th->getMessage();
        Log::error($th->getMessage());
      }
      
    }

    public function resetPassword(LoginRequest $request)
    {
               $request->validate([
                 'token' => 'required',
                 'email' => 'required|email',
                 'password' => 'required|string|confirmed|min:8',
               ]);

               $status = Password::reset(
                  $request->only('email', 'password', 'confirm_password', 'token'),
                  function($user, $password){
                    $user->forceFill([
                        'password' => Hash::make($password),
                    ])->save();
                  }
                );

              return $status === Password::PASSWORD_RESET
              ? response()->json(['status' => __($status)])
              : response()->json(['password' => __($status)]);
    }
}
