<?php

namespace App\Http\Controllers;

use App\Models\Checkouts;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use function PHPUnit\Framework\isEmpty;
use function PHPUnit\Framework\isNull;

class OrderController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function show(Request $request)
    {
        if ($request->has('uid')) {

            $order = Order::where('user_id', $request->uid)->get();
            return $order;
        }
        if ($request->has('did')) {
            $order = Order::where('driver_id', $request->did)->get();
            return $order;
        }
    }
    public function store(Request $request)
    {
        $orders = new Order;
        $orders->driver_id                      = $request->driver_id;
        $orders->user_id                        = Auth::id();
        $orders->dari                           = $request->dari;
        $orders->alamat_dari                    = $request->alamat_dari;
        $orders->ke                             = $request->ke;
        $orders->alamat_tujuan                  = $request->alamat_tujuan;
        $orders->tanggal_keberangkatan          = $request->tanggal_keberangkatan;
        $orders->waktu_keberangkatan            = $request->waktu_keberangkatan;
        $orders->jumlah_kursi                   = $request->jumlah_kursi;
        if ($orders->save()) {
            $checkouts = Checkouts::where('driver_id', $request->driver_id)
                ->where('tanggal_keberangkatan', $request->tanggal_keberangkatan)->first();

            if (!$checkouts) {

                $insert = new Checkouts();
                $insert->driver_id              = $request->driver_id;
                $insert->tanggal_keberangkatan  = $request->tanggal_keberangkatan;
                $insert->jumlah_kursi           = $request->jumlah_kursi;
                $insert->save();
            } else {
                $checkouts->jumlah_kursi           = $checkouts->jumlah_kursi + $request->jumlah_kursi;
                $checkouts->update();
            }
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success!',
        ]);
    }
    public function showCheck()
    {
        $checkouts = Checkouts::all();
        return $checkouts;
    }
}
