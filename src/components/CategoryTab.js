import { View, StyleSheet, ScrollView } from "react-native";
import { FAB } from 'react-native-paper';
import { useRef } from "react";
import RBSheet from "react-native-raw-bottom-sheet";

import HorizontalCategory from "./HorizontalCategory";
import ModalCreateCategory from "./ModalCreateCategory";

function CategoryTab() {
    const refRBSheet = useRef();


    return (  
        <View style={styles.container}>
            <FAB
                icon="plus"
                label="Tạo danh mục"
                style={styles.fab}
                onPress={() => {refRBSheet.current.open()}}
                color='white'
            />
            
            <ScrollView>
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory />
                <HorizontalCategory /> 
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: 
                    {
                        backgroundColor: "rgba(100, 100, 100, 0.5)",
                    },
                    draggableIcon: {
                        backgroundColor: "grey"
                    },
                    container: {
                        height: 200
                    }
                }}
            >
                <ModalCreateCategory />
            </RBSheet>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 7,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 100,
        backgroundColor: '#0e7bc5',
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 1.5
    },
})

export default CategoryTab;