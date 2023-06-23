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
import {
  fetchMovieCredits,
  fetchMovieDetails,
  fetchSimilarMovies,
  image500,
} from "../api/moviedb";

const { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : " mt-3";

const MovieScreen = (): JSX.Element => {
  const { params: item } = useRoute<any>();
  const [isFavourite, setIsFavourite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [movieDetail, setMovieDetail] = useState<any>(null);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    //call the movie detail api
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (movieId: number) => {
    const data = await fetchMovieDetails(movieId);
    // console.log(data, "MovieDetails");
    if (data) setMovieDetail(data);
    setLoading(false);
  };
  const getMovieCredits = async (movieId: number) => {
    const data = await fetchMovieCredits(movieId);
    // console.log(data);
    if (data && data.cast) setCast(data.cast);
  };
  const getSimilarMovies = async (movieId: number) => {
    const data = await fetchSimilarMovies(movieId);
    // console.log(data, 'fetchSimilarMovies');
    if (data && data.results) setSimilarMovies(data.results);
  };

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
                  source={
                    movieDetail.poster_path
                      ? {
                          uri: image500(movieDetail.poster_path),
                        }
                      : require("../assets/images/fallback-movie-poster.jpeg")
                  }
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
                {movieDetail.title}
              </Text>
              {/* status, release, runtime */}
              <Text className="text-neutral-400 font-semibold text-base text-center">
                {movieDetail.status} • {movieDetail.release_date.split("-")[0]}{" "}
                • {movieDetail.runtime} min
              </Text>
              {/* genres */}
              <View className="flex-row justify-center mx-4 space-x-2">
                {movieDetail.genres.map((item: any, index: number) => {
                  const showDot =
                    index + 1 != movieDetail.genres.length && index < 2;
                  return (
                    index < 3 && (
                      <Text
                        key={index}
                        className="text-neutral-400 font-semibold text-base text-center"
                      >
                        {item.name} {showDot && "•"}
                      </Text>
                    )
                  );
                })}
              </View>
              {/* description */}
              <Text className="text-neutral-400 mx-4 tracking-wide">
                {movieDetail.overview}
              </Text>
            </View>
            {/* cast */}
            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
            {similarMovies.length > 0 && (
              <MovieList
                title="Similar Movies"
                hideSeeAll={true}
                data={similarMovies}
              />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default MovieScreen;
