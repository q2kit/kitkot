import { Text, View } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

function Home() {
  const video = {
    uri: "https://drive.vnsvs.net/ssstik.io_1694951973186.mp4",
  };

  return (
    <View>
      <VideoPlayer video={video} />
    </View>
  );
}

export default Home;
