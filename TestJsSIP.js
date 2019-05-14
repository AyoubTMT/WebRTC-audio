var ua = new JsSIP.UA({
    'ws_servers': 'ws://localhost:9090',
     'uri': 'sip:alice@areteasea.com'
});

ua.on('registered', function(){
console.log('Registered!');
});
ua.on('unregistered', function(){
console.log('Unregistered!');
});
ua.on('registrationFailed', function(e){
console.log('Registration failed! Cause: '+ e.cause);
});

ua.register();

ua.on('newMessage', function(e) {
     if (e.direction === 'local') {
     console.log('Sending Message!');
     }
     else if (e.direction === 'remote') {
     console.log('Received Message!');
     e.message.accept();
     }
});

ua.sendMessage('sip:bob@areteasea.com', 'Hi Bob!', {
     eventHandlers: {
     'succeeded': function(){ console.log('Message succeeded!'); },
     'failed': function(e){ console.log('Message failed! Cause: '+ e.cause); }
     }
});

ua.on('newRTCSession', function(e) {
     if (e.direction === 'local') {
     console.log('Outgoing call');
     }
     else if (e.direction === 'remote') {
     console.log('Incoming call');
     e.session.answer();
     }
});

ua.call('sip:bob@areteasea.com', {
     eventHandlers: {
     'accepted': function(){ console.log('Call accepted!'); },
     'failed': function(e){ console.log('Call failed! Cause: '+ e.cause); }
     }
});


