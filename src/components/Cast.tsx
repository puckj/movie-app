import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { image185 } from "../api/moviedb";

const Cast = ({ cast, navigation }) => {
  const [loadedItems, setLoadedItems] = useState(10);
  const renderItem = ({ item }) => {
    // console.log(item);
    return (
      <TouchableOpacity
        className="mr-4 items-center"
        onPress={() => navigation.navigate("Person", item)}
      >
        <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
          <Image
            className="h-24 w-20"
            source={
              item.profile_path
                ? {
                    uri: image185(item.profile_path),
                  }
                : require("../assets/images/fallback-person.png")
            }
          />
        </View>
        <Text className="text-white text-xs mt-1">
          {item.character.length > 10
            ? item.character.slice(0, 10) + "..."
            : item.character}
        </Text>
        <Text className="text-white text-xs mt-1">
          {item.name.length > 10 ? item.name.slice(0, 10) + "..." : item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  const loadMoreItems = () => {
    setLoadedItems(loadedItems + 10);
  };

  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <FlatList
        horizontal
        data={cast.slice(0, loadedItems)}
        // data={cast}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={() => {
        //   return isLoadingMore ? (
        //     <View className="absolute flex-row justify-center items-center h-20 w-20">
        //       <Progress.CircleSnail
        //         thickness={3}
        //         size={40}
        //         color="rgb(115 115 115)"
        //       />
        //     </View>
        //   ) : null;
        // }}
      />
    </View>
  );
};

export default Cast;
