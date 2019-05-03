
export default {
  'It should play audio remote': (browser) => {
    const path = '/src/content/peerconnection/audio/index.html';
    const url = 'file://' + process.cwd() + path;

    // TODO Test all codecs?
    browser
      .url(url)
      .click('#callButton')
      .waitForMediaPlaybackReady('#audio2', 5000, 'Receiving remote audio.')
      .end();
  }
};