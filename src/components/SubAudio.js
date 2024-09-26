import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View, subtitles } from 'react-native';
import React from 'react';
import icons from '../constrants/icons';

const SubAudio = ({ visible, audioTracks, selectedAudio, onSelectAudio, selectSubtitle, onSelectSubtitle, onApply, onCancel }) => {
    return (
        <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalBody}>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.title}>Audio Track(s)</Text>
                            <ScrollView style={styles.tracsContainer}>
                                {
                                    audioTracks ? audioTracks.map((t, i) => (
                                        <TouchableOpacity activeOpacity={0.9} key={i} onPress={() => onSelectAudio(i.toString())}>
                                            <View style={styles.tracItem}>
                                                <Text key={i} style={styles.tracText}>
                                                    {`Audio ${i + 1} - ${t.language ? t.language.toUpperCase() : 'Undefined'}`}
                                                </Text>

                                                {
                                                    selectedAudio === i.toString() ? (
                                                        // eslint-disable-next-line react-native/no-inline-styles
                                                        <Image source={icons.check} style={{ width: 20, height: 20 }} />
                                                    ) : ''
                                                }

                                            </View>
                                        </TouchableOpacity>
                                    )) :
                                        <Text style={styles.textLight}>Audio not found</Text>
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.title}>Subtitle(s)</Text>
                            <ScrollView style={styles.tracsContainer}>
                                {
                                    subtitles ? subtitles?.map((t, i) => (
                                        <TouchableOpacity activeOpacity={0.9} key={i} onPress={() => onSelectSubtitle(i.toString())}>
                                            <View style={styles.tracItem}>
                                                <Text key={i} style={styles.tracText}>
                                                    {`Subtitle ${i + 1}`}
                                                </Text>
                                                {
                                                    selectedAudio === i.toString() ? (
                                                        // eslint-disable-next-line react-native/no-inline-styles
                                                        <Image source={icons.check} style={{ width: 20, height: 20 }} />
                                                    ) : ''
                                                }
                                            </View>
                                        </TouchableOpacity>
                                    )) :
                                        <Text style={styles.textLight}>Subtitles not found</Text>
                                }
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles.modalFooter}>
                        <View style={styles.row}>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
                                    <Text style={styles.textLight}>Apply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                                    <Text style={styles.textDark}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    modalBody: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: '80%',
        height: '80%',
        borderRadius: 10,
        padding: 30,
    },
    modalFooter: {
        marginTop: 'auto', // Push the footer to the bottom
    },
    row: {
        flexDirection: 'row',
        gap: 20,
    },
    col: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        color: '#bed2e6',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    tracsContainer: {
        maxHeight: '80%',
        // marginBottom: 100,
    },
    tracItem: {
        padding: 7,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#616161',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    tracText: {
        color: '#bed2e6',
        fontSize: 15,
    },
    btnContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 20,
    },
    textLight: {
        color: '#bed2e6',
        fontSize: 15,
    },
    textDark: {
        color: '#202020',
        fontSize: 15,
    },
    applyBtn: {
        backgroundColor: '#0b7def',
        padding: 5,
        borderRadius: 5,
        // color: '#bed2e6'
    },
    cancelBtn: {
        backgroundColor: '#bed2e6',
        padding: 5,
        borderRadius: 5,
        // color: '#00031c',
    },
});

export default SubAudio;


// import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React from 'react';

// const SubAudio = ({ visible, audioTracks, subtitles, onApply, onCancel }) => {
//     return (
//         <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="slide">
//             <View style={styles.modalContainer}>
//                 <View style={styles.modalBody}>
//                     <View style={styles.row}>
//                         {/* Audio Tracks Section */}
//                         <View style={styles.col}>
//                             <Text style={styles.title}>Audio Track(s)</Text>
//                             <ScrollView style={styles.tracsContainer}>
//                                 {
//                                     audioTracks && audioTracks.length > 0 ? audioTracks.map((t, i) => (
//                                         <TouchableOpacity activeOpacity={0.9} key={i}>
//                                             <View style={styles.tracItem}>
//                                                 <Text style={styles.tracText}>
//                                                     {`Audio ${i + 1} - ${t.language ? t.language.toUpperCase() : 'Undefined'}`}
//                                                 </Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                     )) :
//                                         <Text style={styles.textLight}>Audio not found</Text>
//                                 }
//                             </ScrollView>
//                         </View>
//                         {/* Subtitles Section */}
//                         <View style={styles.col}>
//                             <Text style={styles.title}>Subtitles</Text>
//                             <ScrollView style={styles.tracsContainer}>
//                                 {
//                                     subtitles && subtitles.length > 0 ? subtitles.map((t, i) => (
//                                         <TouchableOpacity activeOpacity={0.9} key={i}>
//                                             <View style={styles.tracItem}>
//                                                 <Text style={styles.tracText}>
//                                                     {`Subtitle ${i + 1} - ${t.language ? t.language.toUpperCase() : 'Undefined'}`}
//                                                 </Text>
//                                             </View>
//                                         </TouchableOpacity>
//                                     )) :
//                                         <Text style={styles.textLight}>Subtitles not found</Text>
//                                 }
//                             </ScrollView>
//                         </View>
//                     </View>
//                     {/* Footer */}
//                     <View style={styles.modalFooter}>
//                         <View style={styles.btnContainer}>
//                             <TouchableOpacity style={styles.applyBtn} onPress={onApply}>
//                                 <Text style={styles.textLight}>Apply</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
//                                 <Text style={styles.textDark}>Cancel</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.4)', // Slightly darker background
//     },
//     modalBody: {
//         backgroundColor: '#282828', // Darker background for the modal
//         width: '85%',
//         height: '60%',
//         borderRadius: 10,
//         padding: 20,
//     },
//     row: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 20,
//     },
//     col: {
//         flex: 1,
//         marginRight: 10,
//     },
//     title: {
//         color: '#bed2e6',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     tracsContainer: {
//         maxHeight: '70%',
//     },
//     tracItem: {
//         padding: 10,
//         borderRadius: 5,
//         marginBottom: 10,
//         backgroundColor: '#505050',
//     },
//     tracText: {
//         color: '#bed2e6',
//         fontSize: 15,
//     },
//     modalFooter: {
//         marginTop: 'auto', // Push the footer to the bottom
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//     },
//     btnContainer: {
//         flexDirection: 'row',
//         gap: 15,
//     },
//     applyBtn: {
//         backgroundColor: '#0b7def',
//         padding: 10,
//         borderRadius: 5,
//     },
//     cancelBtn: {
//         backgroundColor: '#bed2e6',
//         padding: 10,
//         borderRadius: 5,
//     },
//     textLight: {
//         color: '#fff',
//         fontSize: 15,
//     },
//     textDark: {
//         color: '#202020',
//         fontSize: 15,
//     },
// });

// export default SubAudio;
