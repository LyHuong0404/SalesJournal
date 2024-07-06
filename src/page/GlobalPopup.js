import { useSelector } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { Modal } from "react-native-paper";
const containerStyle = {backgroundColor: 'white', margin: 40, height: 'auto', borderRadius: 10 };


export const GlobalPopup = () => {
  const { globalPopupData } = useSelector(state => state.auth);
  return ( 
    <>
        {globalPopupData?.open && 
          <>
            <Modal visible={true} contentContainerStyle={containerStyle}>
              <View style={styles.container}>
                  <View>
                      <Text style={{ fontWeight: 'bold', color: '#c10d0d', textAlign: 'center', fontSize: 16 }}>Thông báo</Text>
                      <Text style={styles.text_question}>{globalPopupData?.message}</Text>
                  </View>
              </View>
            </Modal>
          </>
        }
    </>

  )
}

const styles = StyleSheet.create({
  container: {
      padding: 20,
  },
  text_question: {
      marginBottom: 15, 
      color: '#575757',
      fontSize: 13,
      textAlign: 'center',
  },
})