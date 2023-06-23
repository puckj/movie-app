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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

type Props = {
  title: string;
  data: any;
  hideSeeAll?: boolean;
};

const MovieList = ({ title, data, hideSeeAll }: Props): JSX.Element => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View className="mb-8 space-x-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item: any, index: number) => {
          // console.log(item.poster_path , item.title);
          const movieName = item.title;
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Movie", item)} // not working if use navigation.navigate
              key={index}
            >
              <View className="space-y-1 mr-4">
                <Image
                  source={
                    item.poster_path
                      ? {
                          uri: image185(item.poster_path),
                        }
                      : require("../assets/images/fallback-movie-poster.jpeg")
                  }
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
