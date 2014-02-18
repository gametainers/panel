'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ui.bootstrap']).
  controller('MyCtrl1', ['$scope', 'gameServer',
    function($scope, gameServer) {
      $scope.gs = gameServer.get({id: 0}, function(){
	$scope.server_status = $scope.gs.status;
      });
  }])
  .controller('MyCtrl2', [function() {

  }])
  .controller('MyCtrl3', ['$scope', 'gameServer','socket',
    function($scope, gameServer, socket) {
      $scope.messages = []
      
      $scope.gs = gameServer.get({id: 0}, function(){
	$scope.server_status = $scope.gs.status;
      });
      
      $scope.gsoff = function(){
	$scope.server_status = 3;
	gameServer.off({id: 0});
      }

      $scope.gson = function(){
	$scope.server_status = 1;
	gameServer.on({id: 0});
      }
      
      socket.on('console', function (data) {
	$scope.messages.push(data.l);
	if ($scope.messages.length > 20){ $scope.messages.shift(); }
      });
      

      $scope.submit = function() {
        if (this.text) {
	  gameServer.command({id: 0},{command:this.text});
	  this.text = "";
        }
      }

      //gameServer.on({id: 0});
  }])
  
  .controller('MyCtrl4', ['$scope', 'gameServer',
    function($scope, gameServer) {
      $scope.configlist = gameServer.configlist({id: 0});
      
      $scope.submit = function() {
	alert(this.file.contents);
        if (this.file.contents) {
	  gameServer.savefile({id: 0, extra:$scope.file_path},{contents:this.file.contents});
        }
      }

      $scope.loadfile = function(file) {
	$scope.file_path = "/" + file;

	gameServer.readfile({id:0, extra:$scope.file_path},function(result){
	  $scope.file = {
	    contents:result.contents
	  }
	});
      }
      
  }])  
  
  .controller('Plugins', ['$scope', 'gameServer', 'bukget',
	      
    function($scope, gameServer, bukget) {

      bukget.categories({},function(result){
	$scope.categories = result;
	$scope.total_count = result[0].count;
	$scope.currentPage = 1;
      });
      
      gameServer.addonsinstalled({id: 0},function(result){
	$scope.addonslist = result;

      });

      bukget.plugins({},function(result){
	$scope.addonsp = result;
      });

      $scope.pageswap = function(page) {
	$scope.currentPage = page;
	bukget.plugins({start:page * 16},function(result){
	  $scope.addonsp = result;
	});
      }
      
      $scope.catswap = function(page) {
	
      }
      
  }])  ;
  
  var PaginationDemoCtrl = function ($scope) {
  $scope.totalItems = 64;
  $scope.currentPage = 4;
  $scope.maxSize = 5;
  
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
};
  