<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $table = 'tb_driver';
    protected $with = ['user', 'vendor'];
    protected $hidden = ['email', 'email_verified_at', 'user_id'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function vendor()
    {
        return $this->belongsTo(Vendor::class, 'vendor_id', 'id');
    }
    public function getUserAttribute()
    {
        return $this->belongsTo(User::class);
    }
    public function getVendorAttribute()
    {
        return $this->belongsTo(Vendor::class);
    }
    public function order()
    {
        return $this->hasMany(Order::class);
    }
    public function checkout()
    {
        return $this->hasMany(Checkouts::class);
    }
    public function chatting()
    {
        return $this->hasMany(Chatting::class);
    }
}
