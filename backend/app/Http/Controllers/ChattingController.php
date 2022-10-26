<?php

namespace App\Http\Controllers;

use App\Models\Chatting;
use Illuminate\Http\Request;

class ChattingController extends Controller
{
    public function show(Request $request)
    {
        if($request->has('order_id')){
            $chatting = Chatting::where('order_id', $request->order_id)->get();
        }
        return $chatting;
    }
    public function store(Request $request)
    {
        $chatting = new Chatting();
        $chatting->message     = $request->message;
        $chatting->from  = $request->from;
        $chatting->to = $request->to;
        $chatting->order_id = $request->order_id;
        $chatting->save();
        return response()->json([
            'status' => 200,
            'message' => 'Success!',
        ]);
    }
}
