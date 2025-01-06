import React from 'react';
import VideoPlayer from './VideoPlayer';

const App = () => {
    const videoUrl = 'http://localhost:3001/api/video/sample.mp4'; // URL dari server A

    return (
        <div>
            <h1>Video Player</h1>
            <VideoPlayer videoUrl={videoUrl} />
        </div>
    );
};

export default App;
