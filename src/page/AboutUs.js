import { useNavigation } from "@react-navigation/native";
import { View, Image, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from "react-native";
import { Text } from "react-native-paper";

function AboutUs() {
  const navigation = useNavigation();


  return ( 
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/images/right_arrow.png')} style={{ width: 17, height: 17, objectFit: 'contain' }}/>
            </TouchableOpacity>
            <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Điều khoản sử dụng</Text>            
        </View>
        <ScrollView style={styles.content}>
            <Text style={{ textAlign: 'justify' }} >Điều khoản sử dụng này áp dụng cho việc sử dụng ứng dụng SoBanHang. Bất cứ sự vi phạm nào của người dùng SoBanHang đối với các điều khoản và điều kiện này đều có thể dẫn đến việc bị đình chỉ hoặc kết thúc tài khoản của người dùng SoBanHang.</Text>
            <Text style={styles.title}>1. Điều kiện chung</Text>
            <Text style={{ textAlign: 'justify' }} >Việc người dùng SoBanHang lựa chọn sử dụng ứng dụng SoBanHang đồng nghĩa với việc người dùng SoBanHang chấp nhận tuân thủ các điều khoản, chính sách, thỏa thuận, sử dụng dịch vụ đã được công bố trong Điều khoản sử dụng này.</Text>
            <Text style={styles.title}>2. Sử dụng hợp pháp</Text>
            <Text style={{ textAlign: 'justify' }} >Chúng tôi cung cấp ứng dụng  với các tính năng hỗ trợ quản lý bán hàng cho ngườ dùng SoBanHang, vì vậy chúng tôi không can thiệp và không chịu trách nhiệm đối với bất kì nội dung hoạt động bán hàng của người dùng SoBanHang, bao gồm nhưng không giới hạn hàng hóa, chất lượng hàng hóa mà người dùng SoBanHang đang kinh doanh, cũng như không chịu trách nhiêm đối với các khiếu kiện nào từ người dùng SoBanHang hoặc bên thứ ba phản ánh về nội dung hoạt động của người dùng SoBanHang trên ứng dụng.
            </Text>
            <Text style={{ textAlign: 'justify' }} >Người dùng SoBanHang phải nhận thức và phải có trách nhiệm sử dụng dịch vị của SoBanHang vào công việc kinh doanh hàng hóa, dịch vụ trong khuôn khổ cho phép của pháp luật hiện hành và thuần phong mỹ tục của Việt Nam. Người dùng SoBanHang không được sử dụng dịch vụ của SoBanHang để thực hiện các hành động có thể gây ảnh hưởng đến quyền và lợi ích hợp pháp cuả SoBanHang, cộng đồng hay quyền lợi của bất kì cơ quan, tổ chức, cá nhân nào, không tuyên truyền nội dung đồi trụy, không chống phá nhà nước, kinh doanh hàng hóa thuộc danh mục hàng hóa cấm kinh doanh.Chúng tôi có toàn quyền tạm ngưng cung cấp hoặc hoặc ngăn chặn quyền tiếp tục truy cập ứng dụng của người dùng SoBanHang vào ứng dụng khi có căn cứ hoặc dấu hiệu nghi ngờ người dùng SoBanHang có dấu hiệu vi phạm pháp luật hoặc gây ảnh hưởng đến sự an toàn của SoBanHang, quyền, lợi ích hợp pháp của cộng đồng, cơ quan, tổ chức, cá nhân khác. </Text>
            <Text style={styles.title}>3. Giới hạn trách nhiệm</Text>
            <Text style={{ textAlign: 'justify' }} >Chúng tôi không chịu trách nhiệm và không đảm bảo về tính chính xác những thông tin của người dùng SoBanHang trên ứng dụng. Đồng thời, chúng tôi không chịu trách nhiệm pháp lý và bồi thường cho người dùng SoBanHang và bên thứ ba đối với các thiệt hại trực tiếp, gián tiếp, vô ý, vô hình, các thiệt hại về lợi nhuận, doanh thu, uy tín phát sinh từ việc sử dụng sản phẩm, dịch vụ của SoBanHang. CHúng tôi không chịu trách nhiêm hoặc trách nhiêm liên đới nào đối với hậu quả của việc truy cập trái phép đến máy chủ; trang thiết bị và dữ liệu của người dùng SoBanHang hoặc dữ liệu cá nhân của người dùng SoBanHang vì tai nạn, phương tiện bất hợp pháp, thiệt bị của bên thứ ba và các nguyên nhân khác nằm ngoài sự kiểm soát của chúng tôi.</Text>
            <Text style={styles.title}>4. Đảm bảo cung cấp dịch vụ</Text>
            <Text style={{ textAlign: 'justify' }} >Ứng dụng SoBanHang đươc cung cấp trên cơ sở "có thể thực hiện được". CHúng tôi không đảm bảo rằng ứng dụng của chúng tôi sẽ luôn sẵn sàng, luôn có thể sử dụng, không bao giờ bị gián đoạn, đúng thời gian, không có lỗi bởi các sự cố, bao gồm nhưng không giới hạn như hacker hoặc mất mạng Internet trên diện rộng. Tuy nhiên, cúng tôi cam kết cố gắng trong mọi điều kiện và làm hết sức khả năng có thể để đảm bảo rằng ứng dụng SoBanHang luôn được sẵn sáng cho việc sử dụng.
            </Text>
            <Text style={{ textAlign: 'justify' }} >Chúng tôi cam kết nỗ lực khắc phục sự gián đoạn và đưa ra sự điều chỉnh, sữa chữa và hỗ trợ trong khả năng có thể để phục hồi ứng dụng nhanh chóng trong trường hợp dịch vụ bị gián đoạn hoặc bị lỗi.</Text>
        </ScrollView>
    </View> 
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfffc',
    },
    header: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomWidth: 1,  
        borderBottomColor: '#e5e5ea',
    },
    content: {
        flex: 0.9,
        marginVertical: 15,
        paddingHorizontal: 15,
    },
    title: {
        fontWeight: 'bold',
        marginVertical: 10
    }
});

export default AboutUs;