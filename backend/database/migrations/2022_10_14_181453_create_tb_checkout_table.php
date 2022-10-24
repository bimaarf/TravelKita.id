<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTbCheckoutTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_checkouts', function (Blueprint $table) {
            $table->id();
            $table->string('status', 255)->default('Masuk');
            $table->unsignedBigInteger('driver_id');
            $table->foreign('driver_id')->references('id')->on('tb_driver');
            $table->string('tanggal_keberangkatan', 255);
            $table->string('jumlah_kursi', 255);
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
        Schema::dropIfExists('tb_checkouts');
    }
}
