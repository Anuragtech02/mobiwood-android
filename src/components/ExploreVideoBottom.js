import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Text,
  ScrollView,
} from "react-native";
import { VideosContext } from "../contexts/VideosContext.js";
import Video from "react-native-video-player";
import FeatherIcon from "react-native-vector-icons/Feather";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ExplorVideoBottom = (props) => {
  let vidContext = React.useContext(VideosContext);
  const [Videos, setVideos] = React.useState(vidContext.videos);
  const [myTabState, setMyTabState] = useState(0);
  React.useEffect(() => {
    if (props.searchVid) {
      let rslt = vidContext.videos.filter(
        (data) =>
          data.talent
            .toLowerCase()
            .includes((props.searchKeyword || "").toLowerCase()) ||
          (data.displayName &&
            data.displayName
              .toLowerCase()
              .includes(props.searchKeyword.toLowerCase()))
      );
      props.contest && (rslt = rslt.filter((data) => data.contest));
      // console.log(`vidContext.videos : ${JSON.stringify(vidContext.videos)}`);
      // console.log(
      //   `props.searchKeyworkd : ${props.searchKeyword} Results Found While Filtering : ${rslt.length}`,
      // );
      setVideos(rslt);
      props.setSearchVid(false);
    }
    if (
      !props.searchKeyword &&
      (Videos.length != vidContext.videos.length || props.contest)
    ) {
      let rslt = vidContext.videos.filter((data) => data.talent.match(""));
      props.contest && (rslt = rslt.filter((data) => data.contest));
      setVideos(rslt);
    }
  }, [props.searchVid, props.searchKeyword]);
  return (
    <>
      <FlatList
        data={Videos}
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.layoutB}>
            <TouchableOpacity onPress={() => props.clicked(item)}>
              {item.contest ? (
                <Text style={styles.contestBadge}>
                  <FeatherIcon
                    name="award"
                    size={15}
                    color="white"
                    style={{ textAlign: "left" }}
                  />
                </Text>
              ) : (
                <></>
              )}
              <Image
                source={
                  item.thumbnail
                    ? { uri: item.thumbnail }
                    : require("../assets/images/loading.jpg")
                }
                style={{ height: "100%", width: "100%", margin: 2 }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  layoutA: { height: 150, width: windowWidth / 3, backgroundColor: "black" },
  layoutB: { height: 150, width: windowWidth / 3, backgroundColor: "white" },
  suggest: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingTop: 5,
    paddingBottom: 12,
  },
  suggestCategory: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "grey",
    marginRight: 8,
    borderRadius: 5,
  },
  contestBadge: {
    flex: 5,
    top: 5,
    backgroundColor: "#829c30",
    color: "white",
    padding: 5,
    fontWeight: "600",
    fontSize: 14,
    left: 5,
    textAlign: "right",
    position: "absolute",
    zIndex: 9999,
  },
});
export default ExplorVideoBottom;
