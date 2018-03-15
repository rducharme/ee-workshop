'use strict';

angular.module('yapp')
  .factory('pwdService', function($http, $location, $rootScope) {
    var p = {

      assignSession: function() {
       return $http.post('https://beta-hybrid.play-with-docker.com/workshops/646d3994-7523-4dee-9740-5823236e5a73/session', {}, {headers: {'Accept': 'application/json'}}).then(function(response) {
            return response.data.session_id;
        });
      },

      getSession: function() {
        var sessionId = $location.path().replace('/','');
        if (!sessionId) {
          return new Promise(function(resolve,reject){reject()});
        }
        return $http.get('https://beta-hybrid.play-with-docker.com/sessions/' + sessionId).then(function(response) {
          response.data.hostname = 'beta-hybrid.play-with-docker.com';
          return response.data;
        });
      },


      init: function(session) {
        // init the pwd session
        return  new Promise(function(resolve, reject) {
          pwd.init(session.id, {baseUrl: 'https://beta-hybrid.play-with-docker.com'}, function() {
            resolve();
          });
        });
      },

    };

    return p;
  });
