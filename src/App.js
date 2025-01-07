import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {
  // Tentukan nama file video saat ini (misalnya, video pertama)
  const currentVideo = 'sample2.mp4'; // Ubah ini sesuai nama video di folder backend

  return (
    <div className="App">
      <h1>React Video Player</h1>
      <VideoPlayer currentVideo={currentVideo} />
    </div>
  );
}

export default App;
