import React from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";


const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>
const Editor = () => {
    const richText = React.useRef();
    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.tool}>
                    <RichToolbar
                        editor={richText}
                        actions={[
                            actions.setBold, actions.setItalic, actions.setUnderline,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,
                            actions.setStrikethrough,
                            actions.undo,
                            actions.redo,
                            actions.checkboxList,
                            actions.heading1
                        ]}
                        iconMap={{ [actions.heading1]: handleHead }}
                    />
                </View>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                        <RichEditor
                            ref={richText}
                            onChange={descriptionText => {
                                console.log("descriptionText:", descriptionText);
                            }}
                        />

                </KeyboardAvoidingView>
            </ScrollView>


        </SafeAreaView>
    );
};

export default Editor;
const styles = StyleSheet.create({
    tool: {
        borderWidth: 1,
        overflow:'visible',
        width:'95%',
        alignSelf:'center'
    }
})