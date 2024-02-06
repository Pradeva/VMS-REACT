import './App.css';
import io from 'socket.io-client';

function App() {
  let socket;
  const handleButtonClick = (e) => {
    const VE = document.getElementById("videoElement")
        const mediaSource = new MediaSource();
        const DataURL = URL.createObjectURL(mediaSource);
        const Codec = "video/mp4; codecs=\"avc1.64001f\""
        VE.src = DataURL;

        mediaSource.addEventListener('sourceopen', function (e) {
            const buffer = mediaSource.addSourceBuffer(Codec);
            buffer.mode = 'sequence';
            buffer.addEventListener('updateend', function (e) {
                if (
                    mediaSource.duration !== Number.POSITIVE_INFINITY &&
                    VE.currentTime === 0 &&
                    mediaSource.duration > 0
                ) {
                    VE.currentTime = mediaSource.duration - 1;
                    mediaSource.duration = Number.POSITIVE_INFINITY;
                }

                VE.play();
            });

            socket = io('http://127.0.0.1:7878/', { path: '/streams/CAM-018'});
            socket.on('segment', function (data) {
                data = new Uint8Array(data);
                buffer.appendBuffer(data);
            });
        });
  }

  // const handlestop = (e) => {
  //   if (socket) {
  //     const VE = document.getElementById("videoElement")
  //     VE.pause();
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
      <video className='Video-element' id="videoElement"></video>
      <button className="Button-element" onClick={handleButtonClick}>Start</button>  
      {/* <button className="Button-element" onClick={handlestop}>Stop</button>   */}
      </header>
    </div>
  );
}

export default App;
