import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Color } from '../Style';
const Accordion = ({ sections }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleSection = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <View style={styles.container}>
            {sections.map((section, index) => (
                <View key={index} style={styles.sectionContainer}>
                    <TouchableOpacity onPress={() => toggleSection(index)} style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{section.title}</Text>
                        <Image
                            source={activeIndex === index ? require('../Assets/img/icons/down.png') : require('../Assets/img/icons/next.png')}
                            style={styles.dropdownIcon}
                        />
                    </TouchableOpacity>
                    {activeIndex === index && (
                        <View style={styles.sectionContent}>
                            <Text>{section.content}</Text>
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    sectionContainer: {
        borderBottomWidth: 2,
        borderColor: Color.white,
    },
    sectionHeader: {
        padding: 10,
        backgroundColor: Color.green,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    sectionHeaderText: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 14,
        color: '#fff',
    },
    sectionContent: {
        // padding: 10,
    },
    dropdownIcon: {
        height: 20,
        width: 20,

        alignSelf: "center"
    }
});

export default Accordion;
