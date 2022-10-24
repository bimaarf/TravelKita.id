<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_orders', function (Blueprint $table) {
            $table->id();
            $table->string('status', 255)->default('Masuk');
            $table->unsignedBigInteger('driver_id');
            $table->foreign('driver_id')->references('id')->on('tb_driver');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('dari', 255)->nullable();
            $table->string('alamat_dari', 255)->nullable();
            $table->string('ke', 255)->nullable();
            $table->string('alamat_tujuan', 255)->nullable();
            $table->string('tanggal_keberangkatan', 255)->nullable();
            $table->string('waktu_keberangkatan', 255)->nullable();
            $table->string('jumlah_kursi', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_orders');
    }
}
