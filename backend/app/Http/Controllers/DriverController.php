<?php

namespace App\Http\Controllers;

use App\Models\Checkouts;
use App\Models\Driver;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DriverController extends Controller
{
    public function prosesPesanan(Request $request)
    {
        $driver = Driver::where('user_id', auth('sanctum')->user()->id)->first();
        if ($request->has('terima')) {
            $orders = Order::where('id', $request->terima)
                ->where('driver_id', $driver->id)->first();
            $orders->status = $request->status;
            $orders->update();
        }
        if ($request->has('proses')) {
            $orders = Order::where('id', $request->proses)
                ->where('driver_id', $driver->id)->first();
            $orders->status = $request->status;
            $orders->update();
        }
        if ($request->has('selesai')) {
            $orders = Order::where('id', $request->selesai)
                ->where('driver_id', $driver->id)->first();
            $orders->status = $request->status;
            $orders->update();
        }
        return response()->json([
            'status' => 200,
            'message' => 'Success!',
        ]);
    }
    public function showDriver(Request $request)
    {
        $get_id_driver_filtered = array();
        $un_get_id_driver_filtered = array();
        $checkouts = Checkouts::where('tanggal_keberangkatan', $request->tanggal_keberangkatan)->get();
        if ($request->has('tanggal_keberangkatan')) {
            if (count($checkouts) > 0) {
                foreach ($checkouts as $check) {
                    array_push($un_get_id_driver_filtered, $check->driver_id);
                }
                $checkouts_two = Checkouts::where('tanggal_keberangkatan', $request->tanggal_keberangkatan)->get();
                foreach ($checkouts_two as $check_two) {
                    array_push($get_id_driver_filtered, $check_two->driver_id);
                }
                $driver = Driver::all();
                $driver_filtered_id = array();
                $driver_filtered_un_get_id = array();
                for ($j = 0; $j < count($get_id_driver_filtered); $j++) {
                    foreach ($checkouts as $drv) {
                        if ($drv->driver_id === $get_id_driver_filtered[$j]) {
                            array_push($driver_filtered_id, $drv->driver_id);
                        }
                    }
                }
                $finish = array();
                $unique_driver_un_checkout = array();

                foreach ($driver as $drv_two) {
                    for ($l = 0; $l < count($driver_filtered_id); $l++) {
                        if ($drv_two->id != $driver_filtered_id[$l]) {
                            array_push($driver_filtered_un_get_id, $drv_two->id);
                        }
                    }
                }
                for ($filter = 0; $filter < count($driver_filtered_un_get_id); $filter++) {
                    if (max(array_values(array_count_values($driver_filtered_un_get_id))) == count($driver_filtered_id)) {
                        array_push($finish, $driver_filtered_un_get_id[$filter]);
                    }
                }

                $unique = array_unique($driver_filtered_un_get_id);
                for ($last = 0; $last < count($unique); $last++) {
                    foreach ($driver as $key => $drv_filtered) {
                        if ($drv_filtered->id === array_values($unique)[$last]) {

                            array_push($unique_driver_un_checkout, $drv_filtered->id);
                        }
                    }
                }

                $driver_diff = array_diff($unique_driver_un_checkout, $driver_filtered_id);
                $driver_unFiltered = array();
                $driver_filtered = array();
                foreach ($driver as $drv_diff) {
                    for ($cout_diff = 0; $cout_diff < count($driver_diff); $cout_diff++) {
                        if ($drv_diff->id === array_values($driver_diff)[$cout_diff]) {
                            array_push($driver_unFiltered, $drv_diff);
                        }
                    }
                }
                foreach ($checkouts as $drv_diff) {
                    for ($cout_diff = 0; $cout_diff < count($driver_diff); $cout_diff++) {
                        if ($drv_diff->driver_id !== array_values($driver_diff)[$cout_diff]) {
                            array_push($driver_filtered, $drv_diff);
                        }
                    }
                }
                $unique_drive_filter = array_unique($driver_filtered);
                return array($driver_unFiltered, array_values($unique_drive_filter),);
            } else {
                $driver = Driver::all();
                return array($driver);
            }
        }
    }
}
