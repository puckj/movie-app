import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/core";

let { width, height } = Dimensions.get("window");

const MovieList = ({ title, data }) => {
  const navigation = useNavigation();
  const movieName = "Ant-Man and the Wasp: Quantumania";
  return (
    <View className="mb-8 space-x-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        <TouchableOpacity>
          <Text style={styles.text} className="text-lg">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              //   onPress={() => navigation.navigate("Movie", item)}
              key={index}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={require("../assets/images/moviePoster2.png")}
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  className="rounded-3xl"
                />
                <Text className="text-neutral-300 ml-1">
                  {movieName.length > 14
                    ? movieName.slice(0, 14) + "..."
                    : movieName}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieList;
