import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/Cast";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = (): JSX.Element => {
  const movieName = "Ant-Man and the Wasp: Quantumania";

  const { params: item } = useRoute();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    // console.log(item);
    //call the movie detail api
    return () => {};
  }, [item]);

  return (
    <>
      {/* back button and favourite button */}
      <SafeAreaView
        className={
          "absolute z-20 w-full flex-row justify-between items-center px-4" +
          topMargin
        }
      >
        <TouchableOpacity
          style={styles.background}
          className="rounded-xl p-1"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        {!loading && (
          <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
            <HeartIcon
              size={35}
              color={isFavourite ? theme.background : "white"}
            />
          </TouchableOpacity>
        )}
      </SafeAreaView>

      {/* main ScrollView*/}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900"
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <View className="w-full">
              <View>
                <Image
                  source={require("../assets/images/moviePoster2.png")}
                  style={{ width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(23,23,23,0.8)",
                    "rgba(23,23,23,1)",
                  ]}
                  style={{ width, height: height * 0.4 }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  className="absolute bottom-0"
                />
              </View>
            </View>
            {/* Movie Details */}
            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
              {/* title */}
              <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movieName}
              </Text>
              {/* status, release, runtime */}
              <Text className="text-neutral-400 font-semibold text-base text-center">
                Released • 2023 • 170 min
              </Text>
              {/* genres */}
              <View className="flex-row justify-center mx-4 space-x-2">
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Action •
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Thrill •
                </Text>
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  Comedy
                </Text>
              </View>
              {/* description */}
              <Text className="text-neutral-400 mx-4 tracking-wide">
                Super-Hero partners Scott Lang (Paul Rudd) and Hope van Dyne
                (Evangeline Lilly) return to continue their adventures as
                Ant-Man and the Wasp. Together, with Hope's parents Janet van
                Dyne (Michelle Pfeiffer) and Hank Pym (Michael Douglas), and
                Scott's daughter Cassie Lang (Kathryn Newton), the family finds
                themselves exploring the Quantum Realm, interacting with strange
                new creatures and embarking on an adventure that will push them
                beyond the limits of what they thought possible.
              </Text>
            </View>
            {/* cast */}
            <Cast navigation={navigation} cast={cast} />
            <MovieList
              title="Similar Movies"
              hideSeeAll={true}
              data={similarMovies}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default MovieScreen;
