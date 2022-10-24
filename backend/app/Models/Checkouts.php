<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkouts extends Model
{
    use HasFactory;
    protected $table = 'tb_checkouts';
    protected $fillable = ['status', 'driver_id', 'tanggal_keberangkatan', 'jumlah_kursi'];
    protected $with = ['driver'];
    public function driver()
    {
        return $this->belongsTo(Driver::class);
    }
}
