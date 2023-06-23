import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { image500 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const TrendingMovies = ({ data }): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const handleOnPress = (item) => {
    navigation.navigate("Movie", item);
  };
  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => (
          <MovieCard item={item} handleOnPress={handleOnPress} />
        )}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};
export default TrendingMovies;

const MovieCard = ({ item, handleOnPress }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleOnPress(item)}>
      <Image
        source={
          item.poster_path
            ? { uri: image500(item.poster_path) }
            : require("../assets/images/fallback-movie-poster.jpeg")
        }
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableWithoutFeedback>
  );
};
