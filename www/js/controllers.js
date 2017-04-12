angular.module('starter.controllers', [])

.controller('PlaylistsCtrl', ['$scope', '$ionicModal', '$location', '$timeout', '$http', function($scope, $ionicModal, $location, $timeout, $http) {


        $http.get("https://api.okoer.com/v2/categories?offset=0&limit=4")
            .then(function(data) {

                // 轮播下
                $scope.arr = data.data
            })
        $http.get("https://api.okoer.com/v2/products/new?offset=0&limit=4")
            .then(function(data) {

                // 最新优品
                $scope.brr = data.data
            })
        $http.get("https://api.okoer.com/v2/products?limit=4&category_id=kNylmZ")
            .then(function(data) {
                // 母婴亲子
                $scope.crr = data.data
            })
        $http.get("https://api.okoer.com/v2/products?limit=4&category_id=9nrwmJ")
            .then(function(data) {
                // 美容时尚
                $scope.drr = data.data
            })
        $http.get("https://api.okoer.com/v2/products?limit=4&category_id=pnjXNl")
            .then(function(data) {

                // 食品饮料
                $scope.err = data.data
            })
        $http.get("https://api.okoer.com/v2/products?limit=4&category_id=WNedmD")
            .then(function(data) {
                // 家居其他
                $scope.frr = data.data
            })

        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
        });

        $scope.closeLogin = function() {
            $scope.modal.hide();
        };


        $scope.login = function() {
            $scope.modal.show();
        };


        $scope.doLogin = function() {
            $timeout(function() {
                $scope.closeLogin();
            }, 1000);
        };

        $http.get("https://api.okoer.com/v2/sliders?client_type=app&location=products")
            .then(function(data) {
                // 轮播图
                $scope.list = data.data
            })

    }])
    .controller('PlaylistCtrl', ["$scope", "$http", "$stateParams", function($scope, $http, $stateParams) {
        // $scope.abr = ['ENPZn1', '9nrwmJ', 'pnjXNl', 'WNedmD', 'kNylmZ']
        $scope.id = $stateParams.id
        $http.get('https://api.okoer.com/v2/products/' + $scope.id)
            .then(function(data) {
                console.log(data)
                $scope.grr = data.data
            })


    }])
    .controller('SearchCtrl', ["$scope", "$http", function($scope, $http) {
        $scope.hrr = [];
        $scope.offset = 0;
        $scope.shangs = function(offset) {
            $http.get('https://api.okoer.com/v2/articles?type=report&offset=' + offset + '&limit=12')
                .then(function(data) {

                    // 测评
                    $scope.hrr = $scope.hrr.concat(data.data)
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
        }
        $scope.loadMore = function() {
            // setTimeout(function() {
            $scope.offset++
                $scope.shangs($scope.offset)
                // }, 1000)

        }
        $scope.$on('stateChangeSuccess', function() {

            $scope.loadMore();
        })

    }])
    .controller('BrowseCtrl', ["$scope", "$http", function($scope, $http) {
        $scope.zrr = [];
        $scope.offset = 0;
        $scope.shang = function(offset) {
            $http.get('https://api.okoer.com/v2/articles?type=news&offset=' + offset + '&limit=16')
                .then(function(data) {
                    //资讯
                    $scope.zrr = $scope.zrr.concat(data.data)
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                })
        }
        $scope.loadMore = function() {
            // setTimeout(function() {
            $scope.offset++
                $scope.shang($scope.offset)
                // }, 1000)

        }

        $scope.$on('stateChangeSuccess', function() {

            $scope.loadMore();
        })

    }])

.controller('AppCtrl', function($scope) {

    })
    .filter("word", function() {
        return function(value) {
            return value.substr(0, 10) + "....."
        }
    })
    .controller('PagesCtrl', ['$scope', '$http', '$stateParams', '$ionicHistory', function($scope, $http, $stateParams, $ionicHistory) {
        $scope.back = function() {
            $ionicHistory.goBack();
        }
        $scope.id = $stateParams.id

        $http.get('https://api.okoer.com/v2/categories/' + $scope.id + '/sub')
            .then(function(data) {
                console.log(data)
                $scope.grr = data.data
                console.log($scope.grr)
            })
        $http.get('https://api.okoer.com/v2/products?category_id=ENPZn1&offset=NaN&limit=20&page=1').then(function(data) {

            $scope.jrr = data.data
            console.log($scope.jrr)
        })
        $scope.dianji = function(id) {
            $http.get('https://api.okoer.com/v2/products?category_id=' + id + '&offset=0&limit=20&page=1').then(function(data) {

                $scope.jrr = data.data
                console.log($scope.jrr)
            })
        }



    }])