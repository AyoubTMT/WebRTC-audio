// Create our JsSIP instance and run it:

var socket = new JsSIP.WebSocketInterface('ws://localhost:9090');
var configuration = {
  sockets  : [ socket ],
  uri      : 'sip:alice@example.com',
  password : ''
};

var ua = new JsSIP.UA(configuration);

ua.start();

// HTML5 <audio> elements in which local and remote audio will be shown
var views = {
    'selfView':   document.querySelector('selfView'),
    'remoteView': document.querySelector('remoteView')
};

// Register callbacks to desired call events
var eventHandlers = {
  'progress': function(e) {
    console.log('call is in progress');
  },
  'failed': function(e) {
    console.log('call failed with cause: '+ e.data.cause);
  },
  'ended': function(e) {
    console.log('call ended with cause: '+ e.data.cause);
  },
  'confirmed': function(e) {
    console.log('call confirmed');
  },
  'failed': function (e) {
      alert('call failed: '+ e.cause);
  },
  'accepted': function (e) {
      // Attach local stream to selfView
      if (call.connection.getLocalStreams().length > 0) {
          localStream = call.connection.getLocalStreams()[0];
          selfView = JsSIP.rtcninja.attachMediaStream(selfView, localStream);
          selfView.volume = 0;
      }
  },
  'addstream': function (e) {
      // Attach remote stream to remoteView
      remoteStream = e.stream;
      remoteView = JsSIP.rtcninja.attachMediaStream(remoteView, remoteStream);
  }
};

var options = {
    'eventHandlers': eventHandlers,
    //'extraHeaders': [ 'X-Foo: foo', 'X-Bar: bar' ],
    'mediaConstraints': {'audio': true, 'video': false},
    'pcConfig': {
      'iceServers': [
        { 'urls': ['stun:a.example.com', 'stun:b.example.com'] },
        { 'urls': 'turn:example.com', 'username': 'foo', 'credential': ' 1234' }
      ]
    }
};
var session = ua.call('sip:bob@example.com', options);

var call = ua.call('music@frafos.com', {
    'eventHandlers': eventHandlers
});