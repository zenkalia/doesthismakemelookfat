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
        document.addEventListener('resume', this.onResume, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        zoomScreen();
    },
    onResume: function() {
        zoomScreen();
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

var designWidth = 320; // zoom to fit this ratio
var scaleChange = 1; // % change in scale from above #s

function zoomScreen() {
  var docWidth = window.outerWidth;
  var docHeight = window.outerHeight;

  if (docWidth != designWidth) {
    var scaleX = docWidth / designWidth;
    $('body').css('zoom', scaleX);
    scaleChange = scaleX;
  }
}

function show_compliment() {
  $("#my-compliment").html(compliments.sample());
  $("#main").addClass('hidden');
  $("#confirm").removeClass('hidden');
}
function photo_success(image_data) {
  $("#main").removeClass('hidden');
  $("#confirm").addClass('hidden');
  $("#my-photo").attr('src', image_data);
  $progress = 0;
  $("#upload-progress").attr('style', 'width:'+$progress+'%');
  $("#deviceready").addClass('hidden');
  $("#progress-bar").removeClass('hidden');
  (function step() {
    $("#upload-progress").attr('style', 'width:'+$progress+'%');
    $progress += Math.floor(Math.random() * 8);
    if ($progress <50) {
      $("#judge-text").addClass('hidden');
      $("#upload-text").removeClass('hidden');
    } else {
      $("#upload-text").addClass('hidden');
      $("#judge-text").removeClass('hidden');
    }
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
  navigator.camera.getPicture(photo_success, null, {
    quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    correctOrientation: true
  });
}

var compliments = {
  items: [
    "You're so hot",
    ":)",
    "No you look amazing~",
    "I’d hit it.",
    "I don’t know why you even asked.",
    "This app isn’t for you if you’re that pretty.",
    "No, you’re looking great.",
    "I don’t think you know what fat is.",
    "Beautiful!",
    "Gorgeous!",
    "Can I get your number? ;)",
    "ASL?",
    "I never thought girls could be this hot on the internet.",
    "HOT!",
    "Dude, you look amazing.",
    "No, you couldn’t look fat in a fat suit.",
    "Can I get more pics?",
    "How do I message you on this thing?",
    "You’re awesome and deserve the best.",
    "Is that a keg in your pants? because damn, I’d like to tap that ass.",
    "You look pretty today",
    "you are beautiful and should know it",
    "You might be the prettiest girl I've ever seen",
    "Now that's tasteful without being gaudy",
    "You need to hit the bars in that!",
    "If I told you to try another outfit, would that mean I could see another photo of you?",
    "YOU ARE SO DAMN LOVABLE.  STOP BEING SO DAMN LOVABLE.",
    "Man, you are the first hot chick I've seen on here today.",
    "Looks fine to me.",
    "A++++ would judge again",
    "Definitely cute.",
    "<3",
    "Total babe :D",
    "Smokin' hot.",
    "Anyone who calls you fat must be blind",
    "No, you're looking HOT.",
    "Hot mama!",
    "no that doesn't make you look fat."
  ],
  sample: function() {
    return this.items[Math.floor(Math.random()*this.items.length)];
  }
};

