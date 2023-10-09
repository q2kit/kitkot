import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { useIsFocused } from '@react-navigation/native';

function Home() {
  const isFocused = useIsFocused();
  const videoPlayerRef = useRef(null);
  const [videoState, setVideoState] = useState({
    currentTime: 0,
    isPlaying: true,
  });
  const video = {
    uri: "https://drive.vnsvs.net/ssstik.io_1694951973186.mp4",
  };

  // useEffect(() => {
  //   if (!isFocused) {
  //     videoPlayerRef.current.pause();
  //     setVideoState({
  //       currentTime: videoState.currentTime,
  //       isPlaying: false,
  //     });
  //   } else {
  //     if (videoPlayerRef.current) {
  //       videoPlayerRef.current.seek(videoState.currentTime);
  //       if (videoState.isPlaying) {
  //         videoPlayerRef.current.play();
  //       }
  //     }
  //   }
  // }, [isFocused]);

  const toggleVideo = () => {
    if (videoState.isPlaying) {
      videoPlayerRef.current.pause();
    } else {
      videoPlayerRef.current.play();
    }
    setVideoState({
      ...videoState,
      isPlaying: !videoState.isPlaying,
    });
  };

  return (
    <View>
      <VideoPlayer
        onPress={toggleVideo}
        // videoRef={videoPlayerRef}
        video={video}
      />
    </View>
  );
}

export default Home;
