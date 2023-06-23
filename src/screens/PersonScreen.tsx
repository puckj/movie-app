import {
  View,
  Text,
  Platform,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../theme";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import { fetchPersonDetails, fetchPersonMovieCredits, image342 } from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticleMargin = ios ? "" : " my-3";

const PersonScreen = (): JSX.Element => {
  const { params: item } = useRoute<any>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [personDetail, setPersonDetail] = useState<any>(null);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // console.log(item, "item <<PersonScreen");
    getPersonDetails(item.id);
    getPersonMovieCredits(item.id);
  }, []);

  const getPersonDetails = async (personId: number) => {
    const data = await fetchPersonDetails(personId);
    // console.log(data, "PERSON DETAILS");
    if (data) setPersonDetail(data);
    setLoading(false);
  };
  const getPersonMovieCredits = async (personId:number) =>{
    const data = await fetchPersonMovieCredits(personId);
    // console.log(data.cast, "getPersonMovieCredits");
    if (data && data.cast) setPersonMovies(data.cast);
  }

  return (
    <>
      {/* back button and favourite button */}
      <SafeAreaView
        className={
          "absolute z-20 w-full flex-row justify-between items-center px-4" +
          verticleMargin
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
            <HeartIcon size={35} color={isFavourite ? "red" : "white"} />
          </TouchableOpacity>
        )}
      </SafeAreaView>

      {/* main ScrollView*/}
      <ScrollView
        className="flex-1 bg-neutral-900"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {loading ? (
          <Loading />
        ) : (
          <View style={{ paddingTop: ios ? 100 : 85 }}>
            {/* person details */}
            <View
              style={{
                shadowColor: "gray",
                shadowRadius: 40,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 1,
                elevation: 10,
              }}
              className="flex-row justify-center"
            >
              <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
                <Image
                  source={
                    personDetail.profile_path
                      ? { uri: image342(personDetail.profile_path) }
                      : require("../assets/images/fallback-person.png")
                  }
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            <View className="mt-6">
              <Text className="text-3xl text-white font-bold text-center">
                {personDetail.name}
              </Text>
              <Text className="text-base text-neutral-500 text-center">
                {personDetail.place_of_birth}
              </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetail.gender === 1 ? "Female" : "Male"}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetail.birthday}
                </Text>
              </View>
              <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known for</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetail.known_for_department}
                </Text>
              </View>
              <View className="px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">
                  {personDetail.popularity.toFixed(2)} %
                </Text>
              </View>
            </View>
            <View className="my-6 mx-4 space-y-2">
              <Text className="text-white text-lg">Biography</Text>
              <Text className="text-neutral-400 tracking-wide">
                {personDetail.biography ? personDetail.biography : "N/A"}
              </Text>
            </View>
            <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default PersonScreen;
