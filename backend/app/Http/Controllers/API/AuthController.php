<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Driver;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|min:4',
            'email' => 'required|email|max:191',
            'password' => 'required|min:4',
            'password_confirmation' => 'required|min:4',
            'telp' => 'required|min:4',
        ]);
        $user = User::where('email', $request->email)->first();
        if ($user) {
            return response()->json([
                'status' => 100,
                'validation_errors' => 'e-mail has been registered!',
            ]);
        } else {

            if ($validator->fails()) {
                return response()->json([
                    'validation_errors' => $validator->errors(),
                ]);
            } else {
                if ($request->password === $request->password_confirmation) {

                    $user = User::create([
                        'name' => $request->name,
                        'email' => $request->email,
                        'password' => Hash::make($request->password),
                        'telp' => $request->telp,
                        'status' => 'Non Active',
                    ]);

                    $token = $user->createToken($user->email . '_Token')->plainTextToken;
                    return response()->json([
                        'status' => 200,
                        'id' => sha1(($user->name)),
                        'username' => $user->name,
                        'token' => $token,
                        'message' => 'Registered Successfully!',
                    ]);
                } else {

                    return response()->json([
                        'status' => 201,
                        'validation_errors' => 'Password not match!',
                    ]);
                }
            }
        }
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|max:191',
            'password' => 'required|max:30|min:5',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 202,
                'validation_error' => $validator->errors(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || Hash::check($request->email, $user->email)) {

                return response()->json([
                    'status' => 102,
                    'validation_error' => 'Your email is not registered!',
                ]);
            }

            if (!$user || !Hash::check($request->password, $user->password)) {

                return response()->json([
                    'status' => 101,
                    'validation_error' => 'Your password is wrong!',
                ]);
            }
            if ($user || !Hash::check($request->password, $user->password)) {
                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                $user->hasRole('admin') && $role = 'admin';
                $user->hasRole('vendor') && $role = 'vendor';
                $user->hasRole('driver') && $role = 'driver';
                $user->hasRole('user') && $role = 'user';
                $getIdDriver = Driver::where('user_id', $user->id)->first();
                if($user->hasRole('driver')){
                    $uid = $getIdDriver->id;
                }else{
                    $uid = $user->id;
                }

                return response()->json([
                    'status' => 200,
                    'role' => $role,
                    'id' => $uid,
                    'username' => $user->name,
                    'email' => $user->email,
                    'token' => $token,
                    'message' => 'Logged In Successfully!',
                ]);
            }
        }
    }
    public function logout()
    {
        if (Auth::user()->token) {

            Auth::user()->tokens->each(function ($token, $key) {
                $token->delete();
            });
            return response()->json([
                'status' => 200,
                'message' => 'Logout successfully',
            ]);
        } else {
            return response()->json([
                'status' => 419,
                'message' => 'Logout successfully',
            ]);
        }
    }
}
