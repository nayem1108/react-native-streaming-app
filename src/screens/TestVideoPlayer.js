/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import icons from '../constrants/icons';
import Slider from '@react-native-community/slider';
import SubAudio from '../components/SubAudio';
import BrightnessControl from '../components/BrightnessControl';
import { getBrightnessLevel } from '@reeq/react-native-device-brightness';
import VolumeController from '../components/VolumeController';



const TestVideoPlayer = () => {
    const navigation = useNavigation();
    const [isPaused, setIsPaused] = useState(false);
    const [isTouced, setIsTouced] = useState(false);
    const [isMute, setIsMute] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [resizeMode, setresizeMode] = useState('cover');
    const [progress, setProgress] = useState(0);
    const [audioTracks, setAudioTracks] = useState();
    const [modalVisible, setmodalVisible] = useState(false);
    const [selectedAudio, setSelectedAudio] = useState('0');
    const [subtitle, setSubtitle] = useState('0');
    const [videoSubtitles, setVideoSubtitles] = useState('0');
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(50);

    const videoRef = useRef();


    const handleBrightnessChange = (value) => {
        setBrightness(value);
    };
    const handleVolumeChange = (value) => {
        setVolume(value);
    };

    useEffect(() => {
        const fetchBrightness = async () => {
            const currentBrightness = await getBrightnessLevel(); // Fetch current brightness
            if (currentBrightness !== null && currentBrightness !== undefined) {
                setBrightness(Math.min(Math.max(currentBrightness * 100, 0), 100)); // Clamp between 0 and 100
            }
        };

        fetchBrightness();
    }, []);



    useEffect(() => {
        Orientation.lockToLandscape();
        SystemNavigationBar.fullScreen(true);

        return () => {
            Orientation.unlockAllOrientations();
            // SystemNavigationBar.fullScreen(false);
        };
    }, []);


    const hideControl = () => {
        setTimeout(() => {
            setIsTouced(false);
        }, 5000);
    };

    const handleMediaSound = () => {
        if (isMute) {

            setIsMute(false);
            if (volume === 0) {
                setVolume(50);
            }
        } else {
            setIsMute(true);
            setVolume(0);
        }
    };

    const handleVideoPress = () => {
        setIsTouced(!isTouced);
        // hideControl();
    };

    const moveBackword = () => {
        const currentTime = progress.currentTime;
        videoRef.current.seek(currentTime - 10);
    };

    const moveForward = () => {
        const currentTime = progress.currentTime;
        videoRef.current.seek(currentTime + 10);
    };

    const formatDuration = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor((time % 60));

        const formateHours = hours > 0 ? `${hours}:` : '';
        const formateMinutes = `${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:`;
        const formatSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

        return `${formateHours}${formateMinutes}${formatSeconds}`;

    };
    const handlePause = () => {
        setIsPaused(!isPaused);
    };
    const handleScreen = () => {
        setresizeMode(resizeMode === '' ? 'cover' : '');
    };
    const handleSubtitleModal = () => {
        setIsPaused(true);
        setmodalVisible(true);
    };
    const applyChange = () => {
        handlePause();
        setmodalVisible(false);
    };
    const cancelChange = () => {
        handlePause();
        setmodalVisible(false);
    };

    const goBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            {
                modalVisible && (
                    <SubAudio
                        visible={modalVisible}
                        audioTracks={audioTracks}
                        subtitles={videoSubtitles}
                        selectedAudio={selectedAudio}
                        onSelectAudio={(idx) => setSelectedAudio(idx)}
                        selectSubtitle={subtitle}
                        onSelectSubtitle={(idx) => setSubtitle(idx)}
                        onApply={applyChange}
                        onCancel={cancelChange}

                    />
                )
            }

            <View>
                <TouchableOpacity style={[styles.backgroundVideo, { filter: 'brightness10' }]}>
                    <Video
                        style={{ width: '100%', height: '100%', }}
                        source={{ uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }}
                        paused={isPaused}
                        muted={isMute}
                        volume={volume / 100}
                        resizeMode={resizeMode}
                        onLoad={videoInfo => {
                            setAudioTracks(videoInfo.audioTracks);
                            setVideoSubtitles(videoInfo.textTracks);
                        }}
                        onBuffer={(buffer) => {
                            setIsBuffering(buffer.isBuffering);
                        }}
                        ref={videoRef}
                        // eslint-disable-next-line no-shadow
                        onProgress={(progress) => {
                            setProgress(progress);
                        }
                        }
                        selectedAudioTrack={{
                            type: 'index',
                            value: selectedAudio,
                        }}
                        onEnd={() => {
                            Orientation.unlockAllOrientations(); // Reset to default orientation
                            // SystemNavigationBar.fullScreen(false); // Exit fullscreen mode
                            setIsPaused(true);
                            setTimeout(() => {
                                goBack();
                            }, 3000);
                        }}
                    />
                    <View
                        style={[
                            styles.brightnessOverlay,
                            {
                                opacity: 1 - brightness / 100, // Adjust opacity based on brightness
                            },
                        ]}
                    />
                    <TouchableOpacity activeOpacity={1} onPress={() => handleVideoPress()} style={[styles.videoScreenContainer, { backgroundColor: isTouced ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }]}>

                        {
                            !isBuffering ? (
                                isTouced && (
                                    <View style={{ flexDirection: 'row' }} >
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => moveBackword()}>
                                            <Image source={icons.backword} style={{ width: 40, height: 40, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => handlePause()}>
                                            <Image source={isPaused ? icons.play : icons.pause} style={{ width: 40, height: 40, tintColor: '#bed2e6', marginRight: responsiveWidth(15), marginLeft: responsiveWidth(15) }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => moveForward()}>
                                            <Image source={icons.forword} style={{ width: 40, height: 40, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                    </View>
                                )
                            ) : (
                                <ActivityIndicator size="large" color="#0b7def" />
                            )
                        }

                        {(isTouced || isBuffering) && (
                            <>
                                <BrightnessControl brightness={brightness} onBrightnessChange={handleBrightnessChange} />
                                <View style={styles.header}>
                                    <TouchableOpacity onPress={() => goBack()} activeOpacity={0.9}>
                                        <Image source={icons.back} style={{ width: 25, height: 25, tintColor: '#bed2e6' }} />
                                    </TouchableOpacity>
                                    <Text style={[styles.title, styles.textCenter]}>Movie Title</Text>
                                </View>
                                {/* <BrightnessControl /> */}
                                <VolumeController volume={volume} onVolumeChange={handleVolumeChange} />
                            </>
                        )}



                        <View style={[styles.sliderContainer, { opacity: isTouced ? 1 : 0 }]}>
                            <Text style={styles.sliderText}>{formatDuration(progress.currentTime ?? 0)}</Text>
                            <Slider style={styles.sliderProgressbar} disabled={!isTouced}
                                minimumValue={0} maximumValue={progress.seekableDuration}
                                maximumTrackTintColor="#bed2e6"
                                minimumTrackTintColor="#0b7def"
                                thumbTintColor="#0b7def"
                                value={progress.currentTime}
                                onValueChange={(current) => {
                                    videoRef.current.seek(current);
                                }}
                            />
                            <Text style={styles.sliderText}>{formatDuration(progress.seekableDuration ?? 0)}</Text>
                        </View>
                        {
                            (!isBuffering && isTouced) && (
                                <View style={styles.mediaControllerContainer} >
                                    <View style={styles.controllerItemsLeft}>
                                        <TouchableOpacity onPress={() => handleMediaSound()} activeOpacity={0.9}>
                                            <Image
                                                source={
                                                    (volume === 0 || isMute)
                                                        ? icons.mute // Display mute icon if volume is 0 or muted
                                                        : icons.volume // Display volume icon if not muted and volume is greater than 0
                                                }
                                                style={{ width: 30, height: 30, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.controllerItemsRight}>
                                        <TouchableOpacity activeOpacity={0.9} >
                                            <Image source={icons.settings} style={{ width: 30, height: 30, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity activeOpacity={0.9} onPress={() => handleSubtitleModal()}>
                                            <Image source={icons.subtitle} style={{ width: 30, height: 30, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleScreen()} activeOpacity={0.9}>
                                            <Image source={resizeMode === '' ? icons.fullscreen : icons.fullscreenExit} style={{ width: 25, height: 25, tintColor: '#bed2e6' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }
                    </TouchableOpacity>
                </TouchableOpacity >
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00031c',
    },
    brightnessOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
    },
    backgroundVideo: {
        width: '100%',
        height: '100%',
    },
    videoScreenContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderContainer: {
        // backgroundColor: '#00031c',
        width: '90%',
        height: '25%',
        position: 'absolute',
        flexDirection: 'row',
        bottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderProgressbar: {
        flex: 1,
        // bottom: 10,
    },
    sliderText: {
        color: '#bed2e6',
    },
    mediaControllerContainer: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 20,
        position: 'absolute',

    },
    controllerItemsLeft: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
    },
    controllerItemsRight: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        top: 0,
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    title: {
        color: '#bed2e6',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textCenter: {
        textAlign: 'center',
        flex: 1,
    },

});

export default TestVideoPlayer;

