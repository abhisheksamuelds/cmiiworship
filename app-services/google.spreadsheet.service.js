(function () {
    'use strict';

    angular
        .module('app')
        .factory('GoogleSpreadSheetService', GoogleSpreadSheetService);

    GoogleSpreadSheetService.$inject = ['$rootScope'];
    function GoogleSpreadSheetService($rootScope) {
        var service = {};
 
        service.GetSetLists = GetSetLists;
        service.GetSongs = GetSongs;
        service.ViewSong = ViewSong;
        service.LoadScaleList = LoadScaleList;
        service.GetSetListSongs =GetSetListSongs;
 
        return service;
       function GetSetLists(callback) {
        var dfd = new jQuery.Deferred();
        var myCallback = function (error, options, response) {
              if (!error) {
                  dfd.resolve(response);
                /*
                  Parse response.data, loop through response.rows, or do something with
                  response.html.
                */
              }
              else {
                console.log(error);
              }
            };
            
            sheetrock({
              url: "https://docs.google.com/spreadsheets/d/1Zrv-sEEov5zNjb-9vJkTGYOJRgjJuyLXJOct96t1w3M/edit#gid=1495014139",
              query: "select A,B order by A desc",
              reset:true,
              callback: myCallback
            });        
    
        return dfd;
    }
    
    function GetSongs(callback) {
        var dfd = new jQuery.Deferred();
        var myCallback = function (error, options, response) {
              if (!error) {
                  dfd.resolve(response);
                /*
                  Parse response.data, loop through response.rows, or do something with
                  response.html.
                */
              }
            };
            
            sheetrock({
              url: "https://docs.google.com/spreadsheets/d/1Zrv-sEEov5zNjb-9vJkTGYOJRgjJuyLXJOct96t1w3M/edit#gid=0",
              query: "select A,B order by A desc",
              reset:true,
              callback: myCallback
            });        
    
        return dfd;
    }

    function GetSetListSongs(callback,songList) {
        var dfd = new jQuery.Deferred();
        var query = "select A,B,C,D where E=0";
        var totalSongs = songList.split(',');
        for(var song in totalSongs) {
          query = query+" or E="+totalSongs[song];
        }
        var myCallback = function (error, options, response) {
              if (!error) {
                  dfd.resolve(response);
                /*
                  Parse response.data, loop through response.rows, or do something with
                  response.html.
                */
              }
              else {
                console.log(error);
              }
            };
            
            sheetrock({
              url: "https://docs.google.com/spreadsheets/d/1Zrv-sEEov5zNjb-9vJkTGYOJRgjJuyLXJOct96t1w3M/edit#gid=0",
              query: query,
              reset:true,
              callback: myCallback
            });        
    
        return dfd;
    }

    function ViewSong(callback,songNameValue) {
        var dfd = new jQuery.Deferred();
        var songNameSplit = songNameValue.split('-')[0];
        var artistSplit = songNameValue.split('-')[1];
        var myCallback = function (error, options, response) {
              if (!error) {
                  dfd.resolve(response);
                /*
                  Parse response.data, loop through response.rows, or do something with
                  response.html.
                */
              }
              else {
                  console.log(error);
              }
            };
            
            sheetrock({
              url: "https://docs.google.com/spreadsheets/d/1Zrv-sEEov5zNjb-9vJkTGYOJRgjJuyLXJOct96t1w3M/edit#gid=0",
              query: "select A,B,C,D where A ='"+songNameSplit+"' and B ='"+artistSplit+"'" ,
              reset: true,
              callback: myCallback
            });        
    
        return dfd;
    }
    
     function LoadScaleList() {
       $("pre").transpose();
     }
    }

})();