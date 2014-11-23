﻿'use strict';
module App.Controllers {
    export class HomeController extends BaseController {
        public isAuthenticated: boolean;

        constructor($scope: IScope<HomeController>,
            private $location: ng.ILocationService,
            private $timeout: ng.ITimeoutService,
            private dataService: Services.DataService,
            private mapService: Services.MapService) {
            super($scope);
            this.isAuthenticated = false;

            this.dataService.isAuthenticated()
                .then((data) => {
                    this.isAuthenticated = data.IsAuthenticated;
                    var path = this.isAuthenticated ? '/Home' : '/Account/Login';
                    $timeout(() => {
                        this.$location.path(path);
                        if (path == '/Home') {
                            mapService.init('map');
                        }
                    }, 500);
                });
        }
    }
}

//routie('/Account/LogOff', () => {
//    $http.post('api/account/logout')
//    .then((isLoggedOff: boolean) => {
//        if (isLoggedOff) {
//            this.route("Account/Login");
//            this.app.getViewModel('Account').IsAuthenticated(false);
//        }
//    });
//});