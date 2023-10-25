import React, { useEffect, useRef } from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { GET_VIDEOS_URL } from '../config';
import { useAppSelector } from '../redux/hooks';

function Home() {
  const user = useAppSelector(state => state.user);
  const [currentVideo, setCurrentVideo] = React.useState(0);
  const [videos, setVideos] = React.useState([]);
  useEffect(() => {
    fetch(GET_VIDEOS_URL, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVideos(json.videos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ viewableItems, changed }) => {
        setCurrentVideo(viewableItems[0].key);
      },
    },
  ]);

  return (
    <View>
      <FlatList
        data={videos}
        numColumns={1}
        key={1}
        renderItem={({ item, index }) => (
          <VideoPlayer
            video={item}
            currentVideo={currentVideo}
          />
        )}
        pagingEnabled
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
    </View>
  );
}

export default Home;
