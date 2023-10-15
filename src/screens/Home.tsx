import React from 'react';
import {
  View,
  FlatList,
  Text,
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';

function Home() {
  const getData = () => {
    return [
      {
        key: 'a',
        uri: "https://kitkot.q2k.dev/video_example",
        owner: {
          name: "Nguyeenx Vawn A",
          avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
        },
        liked: true,
        likes: 1220,
        comments: 10200,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies, nunc nisl ultricies nunc, quis ultri",
      },
      {
        key: 'b',
        uri: "https://kitkot.q2k.dev/video_example2",
        owner: {
          name: "Nguyeenx Vawn A",
          avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
        },
        liked: false,
        likes: 100,
        comments: 100,
        description: "Example description",
      },
      {
        key: 'c',
        uri: "https://kitkot.q2k.dev/video_example",
        owner: {
          name: "Nguyeenx Vawn A",
          avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
        },
        liked: true,
        likes: 100,
        comments: 100,
        description: "Example description",
      },
      {
        key: 'd',
        uri: "https://kitkot.q2k.dev/video_example2",
        owner: {
          name: "Nguyeenx Vawn A",
          avatar: "https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/352190005_1600614940349484_5227447212799118808_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=5f2048&_nc_ohc=tadqaBy3mX4AX8bSqEk&_nc_ht=scontent-hkg4-2.xx&_nc_e2o=f&oh=00_AfCsFyU0YFTuKDHPj295niEn7zSZdbrgmhQS4u_jJcaK8Q&oe=65309B77",
        },
        liked: false,
        likes: 100,
        comments: 100,
        description: "Example description",
      },
      {
        key: 'e',
        uri: "https://kitkot.q2k.dev/video_example",
        owner: {
          name: "Nguyeenx Vawn A",
          avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
        },
        liked: true,
        likes: 100,
        comments: 100,
        description: "Example description",
      }
    ];
  }

  return (
    <View>
      <FlatList
        data={getData()}
        numColumns={1}
        key={1}
        renderItem={({ item, index }) => (
          <VideoPlayer
            video={item}
          />
        )}
        pagingEnabled
        onViewableItemsChanged={({ viewableItems, changed }) => {
          console.log(viewableItems);
          console.log(changed);
        }}
      />
    </View>
  );
}

export default Home;
