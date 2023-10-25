import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import FriendItem from "../components/FriendItem";
import ChatRecentItem from "../components/ChatRecentItem";

export default function Chat({ navigation }) {
  const friendList = [
    {
      id: 1,
      is_online: true,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: false,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: true,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: false,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: true,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: false,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
    {
      id: 1,
      is_online: true,
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
    },
  ]
  const getRecentMessage = [
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "HelloHelloHelloHelloHelloHello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
    {
      name: "Nguyen Van A",
      avatar: "https://scontent-hkg4-1.xx.fbcdn.net/v/t1.6435-9/36370026_2103135646630625_4956188102608551936_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=be3454&_nc_ohc=FmG4BOEqPP4AX8GS4DN&_nc_ht=scontent-hkg4-1.xx&_nc_e2o=f&oh=00_AfCRywCdcflMl4hIC51MZ2DI1jgG70U-ikcJKHPhcW1peQ&oe=6553293B",
      lastMessage: {
        message: "Hello",
        datetime: "2021-07-01 10:00:00",
      }
    },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#fff"
        />

      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollViewFriendActive}
      >
        {friendList.map((friend, index) => (
          <FriendItem
            key={index}
            friend={friend}
            onPress={() => { }}
          />
        ))}
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewChatRecent}
      >
        {getRecentMessage.map((friend, index) => (
          <ChatRecentItem
            key={index}
            friend={friend}
            onPress={() => { }}
          />
        ))}
        <View style={{ height: 10 }}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
    width: "100%",
    height: "100%",
  },
  search: {
    marginTop: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "90%",
    color: "#fff",
    height: 40,
    backgroundColor: "#333",
    borderRadius: 5,
    paddingLeft: 30,
  },
  searchIcon: {

  },
  scrollViewFriendActive: {
    width: "100%",
    maxHeight: 70,
    minHeight: 70,
    backgroundColor: "#000",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  scrollViewChatRecent: {
    paddingTop: 10,
    marginTop: 2,
  }
});
