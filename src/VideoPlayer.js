import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

const VideoPlayer = ({ currentVideo }) => {
  const videoRef = useRef(null);
  const [videoList, setVideoList] = useState({ previous: null, current: null, next: null });
  const [currentPlaying, setCurrentPlaying] = useState(null);

  useEffect(() => {
    // Fetch video list from the backend
    axios
      .get(`http://localhost:3001/api/videos/${currentVideo}`) // Sesuaikan IP/port backend
      .then((response) => {
        const data = response.data;
        console.log('Video Data:', data);

        // Update video list state
        setVideoList(data);

        // Mulai dengan video sebelumnya (not current)
        setCurrentPlaying(data.previous); // Mulai dengan video sebelumnya
      })
      .catch((error) => {
        console.error('Error fetching video list:', error.message);
      });
  }, [currentVideo]); // Pastikan fetch ulang jika currentVideo berubah

  // Memastikan video berganti setelah selesai
  useEffect(() => {
    if (currentPlaying) {
      videoRef.current.load(); // Force reload video jika URL berubah
    }
  }, [currentPlaying]); // Akan dipanggil setiap kali currentPlaying berubah

  const handleVideoEnd = () => {
    console.log('Current Playing:', currentPlaying);
    console.log('Video List:', videoList);

    if (currentPlaying === videoList.previous) {
      setCurrentPlaying(videoList.current); // Setelah video sebelumnya selesai, lanjut ke video saat ini
    } else if (currentPlaying === videoList.current) {
      setCurrentPlaying(videoList.next); // Setelah video saat ini selesai, lanjut ke video berikutnya
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
