/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var compliments = {
  items: [
    "You're so hot",
    ":)",
    "No you look amazing~"
  ],
  sample: function() {
    return this.items[Math.floor(Math.random()*this.items.length)];
  }
};
function show_compliment() {
  $("#my-compliment").html(compliments.sample());
  $("#main").addClass('hidden');
  $("#confirm").removeClass('hidden');
}
function photo_success(image_data) {
  $("#my-photo").attr('src', image_data);
  $progress = 0;
  $("#upload-progress").attr('style', 'width:'+$progress+'%');
  $("#deviceready").addClass('hidden');
  $("#progress-bar").removeClass('hidden');
  (function step() {
    $("#upload-progress").attr('style', 'width:'+$progress+'%');
    $progress += Math.floor(Math.random() * 15);
    if ($progress < 100) {
      setTimeout(step, 200);
    } else {
      $("#progress-bar").addClass('hidden');
      show_compliment();
      $("#deviceready").removeClass('hidden');
    }
  })();
}
function photothing() {
  navigator.camera.getPicture(photo_success, null, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI
  });
}
