import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import { fetchSearchMovie, image185 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = (value) => {
    console.log("value = ", value);
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovie({
        query: value,
        include_adult: false,
        language: "en-US",
        page: 1,
      }).then((res) => {
        // console.log(res, "RESULT");
        if (res && res.results) setResults(res.results);
        setLoading(false);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };
  const handleTextDebounce = useCallback(debounce(handleSearch, 500), []);
  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor="lightgray"
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* results */}
      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results ({results.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item: any, index: number) => {
              console.log(item);

              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={
                        item.poster_path
                          ? { uri: image185(item.poster_path) }
                          : require("../assets/images/fallback-movie-poster.jpeg")
                      }
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-400 ml-1">
                      {item.title.length > 22
                        ? item.title.slice(0, 22) + "..."
                        : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
