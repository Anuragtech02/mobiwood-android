import React, {useState} from 'react';
// import { firestore } from "../firebase.config.js";
import {View, Text, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserContext} from './UserContext';
import {AuthContext} from './AuthContext';
import SharedVideo from '../screens/SharedVid/SharedVideo.js';
import dynamicLinks from '@react-native-firebase/dynamic-links';
export const VideosContext = React.createContext({});

const VideosContextProvider = ({children}) => {
  const usrCntxt = React.useContext(UserContext);
  const {userDetails, uid} = React.useContext(AuthContext);
  const [videosLimited, setVideosLimited] = useState([]);
  const [videos, setVideos] = useState([]);
  const [id, setId] = useState([]);
  const [vidLikesMap, setVidLikesMap] = useState(new Map());
  const [noOfViewsMap, setNoOfViewsMap] = useState(new Map());
  const [noOfSharesMap, setNoOfSharesMap] = useState(new Map());
  const [noOfFollowersMap, setNoOfFollowersMap] = useState(new Map());
  const [viewProfile, setViewProfile] = useState(null);
  const [viewDisplayName, setViewDisplayName] = useState(null);
  const [myLikedVideos, setMyLikedVideos] = useState(new Map());
  React.useEffect(() => {
    let ttmpp = new Map();
    if (!userDetails || !userDetails.uid) return; 
    // if(uid)
    firestore()
      .collection('user')
      .doc(uid)
      .get()
      .then(async (resp) => {
        let userData = resp.data();
        userData.likedVideos && userData.likedVideos.forEach((item) => {
          ttmpp.set(item, true);
        });
        setMyLikedVideos(ttmpp);
      });
  }, [uid]);
  const fetchLimitedVideos = async () => {
    const initialCount = await AsyncStorage.getItem('count');
    const timestamp = await AsyncStorage.getItem('lastLoad');
    if (!initialCount) await AsyncStorage.setItem('count', '0');
    if (!timestamp)
      AsyncStorage.setItem('lastLoad', JSON.stringify(new Date().getDate()));
    const difference =
      Math.floor(new Date() - new Date(timestamp)) / (1000 * 60 * 60 * 24);
    // console.log(Math.floor(difference / (1000 * 60 * 60 * 24)));
    const getCount = await AsyncStorage.getItem('count');
    const count = parseInt(getCount || 1);
    let vids = [];
    let tmp = [];
    let ids = [];
    let tempVidMap = new Map();
    let tempVidShares = new Map();
    let tempNoOfFollowers = new Map();
    let tempNoOfViewsMap = new Map();
    firestore()
      .collection('contest')
      .orderBy('uploadTime', 'desc')
      .get()
      .then(async (resp) => {
        if (
          1 == 1 ||
          count ||
          !initialCount ||
          !timestamp ||
          difference > 0
        ) {
          resp.docs.forEach((collection, i) => {
            vids.push(collection.data());
            vids[vids.length - 1].id = collection.id;
            ids.push(collection.id);
            // if(tempVidMap.get(collection.id))
            tempVidMap.set(collection.id, collection.data().likes);
            tempVidShares.set(collection.id, collection.data().shares || 0);
            tempNoOfFollowers.set(
              collection.data().userid,
              collection.data().followerCount
                ? collection.data().followerCount
                : 0,
            );
            //console.log(`VIEWS : ${collection.data().views}`)
            tempNoOfViewsMap.set(
              collection.data().id,
              collection.data().views ? collection.data().views : 1,
            );
            if (i < 16) {
              tmp.push(collection.data());
            }
          });
          setId(ids);
          setNoOfFollowersMap(tempNoOfFollowers);
          setVidLikesMap(tempVidMap);
          setNoOfSharesMap(tempVidShares);
          setNoOfViewsMap(tempNoOfViewsMap);
          const checkDynamicLink = async () => {
            const link = await dynamicLinks().getInitialLink();

            // usrCntxt.setVidShared(link.url);
            //console.log(link)
            if (link) usrCntxt.setVidShared(link.url);
          };
          checkDynamicLink();
          setVideos(vids);
          setVideosLimited(tmp);
          AsyncStorage.setItem('count', '0');
          AsyncStorage.setItem('videosLimited', JSON.stringify(tmp));
          AsyncStorage.setItem('videos', JSON.stringify(vids));
          AsyncStorage.setItem('id', JSON.stringify(ids));
          AsyncStorage.setItem('lastLoad', JSON.stringify(new Date()));
        } else {
          AsyncStorage.setItem('count', parseInt(count));
          const tempVids = await AsyncStorage.getItem('videosLimited');
          const totalVids = await AsyncStorage.getItem('videos');
          const vidIds = await AsyncStorage.getItem('id');
          setVideosLimited(JSON.parse(tempVids));
          setVideos(JSON.parse(totalVids));
          setId(JSON.parse(vidIds));
        }
      });
  };

  React.useEffect(() => {
    fetchLimitedVideos();
  }, []);

  return (
    <VideosContext.Provider
      value={{
        videosLimited: videosLimited,
        videos: videos,
        id: id,
        vidLikesMap: vidLikesMap,
        noOfFollowersMap: noOfFollowersMap,
        noOfViewsMap: noOfViewsMap,
        noOfSharesMap: noOfSharesMap,
        viewProfile: viewProfile,
        viewDisplayName: viewDisplayName,
        myLikedVideos: myLikedVideos,
        setMyLikedVideos: setMyLikedVideos,
        setViewDisplayName: setViewDisplayName,
        setViewProfile: setViewProfile,
        setNoOfViewsMap: setNoOfViewsMap,
        setNoOfSharesMap: setNoOfSharesMap,
        setNoOfFollowersMap: setNoOfFollowersMap,
        setVidLikesMap: setVidLikesMap,
        fetchLimitedVideos: fetchLimitedVideos,
      }}>
      {usrCntxt.vidShared ? (
        <SharedVideo />
      ) : !usrCntxt.vidShared && videos.length ? (
        children
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="black" />
          <Text style={{alignContent: 'center', justifyContent: 'center'}}>
            Loading...
          </Text>
        </View>
      )}
    </VideosContext.Provider>
  );
};

export default VideosContextProvider;
