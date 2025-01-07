import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const VideoPlayer = ({ currentVideo }) => {
  const videoRef = useRef(null);
  const [videoList, setVideoList] = useState({ previous: null, current: null, next: null });
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Fetch video list from the backend
    axios
      .get(`http://10.11.1.53:3001/api/videos/${currentVideo}.mp4`) // Sesuaikan IP/port backend
      .then((response) => {
        const data = response.data;
        console.log('Video Data:', data);

        // Update video list state with the correct response
        setVideoList(data);

        // Start with the current video, not previous
        setCurrentPlaying(data.previous); 
      })
      .catch((error) => {
        console.error('Error fetching video list:', error.message);
      });
  }, [currentVideo]); // Make sure to fetch new data if currentVideo changes

  // Memastikan video berganti setelah selesai
  useEffect(() => {
    if (currentPlaying) {
      videoRef.current.load(); // Force reload video jika URL berubah
    }
  }, [currentPlaying]); // Will trigger every time currentPlaying changes

  const handleVideoEnd = () => {
    console.log('Current Playing:', currentPlaying);
    console.log('Video List:', videoList);

    if (currentPlaying === videoList.previous) {
      setCurrentPlaying(videoList.current); // After previous video finishes, move to current
    } else if (currentPlaying === videoList.current) {
      setCurrentPlaying(videoList.next); // After current video finishes, move to next
    }
  };

  return (
    <div>
      <h1>Video Player</h1>
      {currentPlaying ? (
        <video
          ref={videoRef}
          width="800"
          height="450"
          controls
          autoPlay
          onEnded={handleVideoEnd}
        >
          <source src={`http://localhost:3001/api/video/${currentPlaying}`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
