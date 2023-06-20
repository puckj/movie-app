import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {  HeartIcon } from "react-native-heroicons/solid";
import { styles } from "../theme";

let { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = (): JSX.Element => {
  const { params: item } = useRoute();
  useEffect(() => {
    console.log(item);
    //call the movie detail api
    return () => {};
  }, [item]);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      <View className="w-full">
        <SafeAreaView
          className={
            // "absolute z-20 w-full flex-row justify-between items-center px-4" +
            "w-full flex-row justify-between items-center px-4" + 
            topMargin
          }
        >
          <TouchableOpacity
            style={styles.background}
            className="rounded-xl p-1"
          >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <HeartIcon size={35} color="white" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;
