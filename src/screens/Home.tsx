import React, { useEffect, useRef, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const get_videos = setInterval(() => {
      fetch(GET_VIDEOS_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setVideos(json.videos);
          clearInterval(get_videos);
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  const getMoreVideos = () => {
    if (isEnd || isRefreshing) {
      return;
    }
    setIsRefreshing(true);
    fetch(GET_VIDEOS_URL + `?page=${page + 1}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setVideos([...videos, ...json.videos]);
        setIsEnd(!json.has_next);
        setPage(page + 1);
        setIsRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },
      onViewableItemsChanged: ({ viewableItems, changed }) => {
        if (viewableItems?.[0]?.index) {
          setCurrentVideo(viewableItems[0]?.index);
        }
      },
    },
  ]);

  return (
    <View>
      <FlatList
        data={videos}
        numColumns={1}
        key={1}
        renderItem={({ item, index }) => {
          return (
            <VideoPlayer
              video={item}
              index={index}
              currentVideo={currentVideo}
            />
          )
        }}
        pagingEnabled
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        onEndReached={getMoreVideos}
      />
    </View>
  );
}

export default Home;
