<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'tb_orders';
    protected $with = ['driver', 'user'];
    protected $fillable = [
        'driver_id',
        'user_id',
        'dari',
        'alamat_dari',
        'ke',
        'alamat_tujuan',
        'tanggal_keberangkatan',
        'waktu_keberangkatan',
        'jumlah_kursi'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
    public function chatting()
    {
        return $this->hasMany(Chatting::class);
    }
    public function getUserAttribute()
    {
        return $this->belongsTo(User::class);
    }
    public function getDriverAttribute()
    {
        return $this->belongsTo(Driver::class);
    }
}
