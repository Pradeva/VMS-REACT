import React from 'react';
import VideoPlayer from './VideoPlayer';

function App() {
  // Tentukan nama file video saat ini (misalnya, video pertama)
  const currentVideo = '2025-01-07T12:56:05'; // Ubah ini sesuai nama video di folder backend

  return (
    <div className="App">
      <h1>React Video Player</h1>
      <VideoPlayer currentVideo={currentVideo} />
    </div>
  );
}

export default App;
