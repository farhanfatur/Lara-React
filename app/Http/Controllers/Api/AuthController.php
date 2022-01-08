<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller 
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function Login(Request $request) 
    {
        $email = $request->email;
        $password = $request->password;

        if(Auth::attempt(["email" => $email, "password" => $password])) {
            $tokenResult = $this->user::where('email', $email)->first()->createToken('token-auth')->plainTextToken;
            return response()->json([
                "status" => 200,
                "message" => "Login is Valid",
                "access" => [
                    "status_code" => 200,
                    "access_token" => $tokenResult,
                    "token_type" => "Bearer"
                ]
            ]);
        }
        return response()->json([
            "status" => 410,
            "message" => "Login is Invalid",
            "access" => null
        ]);
        
    }

    public function Logout(Request $request)
    {
        $user_id = Auth::user()->id;
        $revokeToken = $this->user->tokens()->where('id', $user_id)->delete();
        if($revokeToken) {
            return response()->json([
                "status" => 200,
                "message" => "Remove token logout",
                "access" => null
            ]);
        }
    }
}