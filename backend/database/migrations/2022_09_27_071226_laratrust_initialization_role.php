<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;
use App\Models\Permission;

class LaratrustInitializationRole extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $admin          =   Role::create([
            'name'          => 'admin',
        ]);
        $vendor          =   Role::create([
            'name'          => 'vendor',
        ]);
        $driver          =   Role::create([
            'name'          => 'driver',
        ]);
        $user           =   Role::create([
            'name'          => 'user',
        ]);

        $dashboard      = Permission::create([
            'name'          => 'dashboard-admin',
        ]);
        $vendor_permission     = Permission::create([
            'name'          => 'vendor',
        ]);
        $driver_permission     = Permission::create([
            'name'          => 'driver',
        ]);
        $user_permission     = Permission::create([
            'name'          => 'pendaftaran',
        ]);

        $admin->attachPermissions([$dashboard, $vendor_permission]);
        $vendor->attachPermissions([$vendor_permission]);
        $driver->attachPermissions([$driver_permission]);
        $user->attachPermissions([$user_permission]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
