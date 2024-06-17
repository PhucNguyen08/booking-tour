const dataNav = [
    {
        title: 'Trang chủ',
        to: '/',
    },
    {
        title: 'Giới thiệu',
        to: '/introduce',
    },
    {
        title: 'Tour du lịch',
        to: '/tour/all',
    },
    {
        title: 'Tin tức',
        to: '/news',
    },
    {
        title: 'Liên hệ',
        to: '/contact',
    },
];

const dataListSort = [
    {
        name: 'Mặc định',
        value: 'default',
    },
    {
        name: 'Giá thấp đến cao nhất',
        value: 'priceAsc',
    },
    {
        name: 'Giá cao đến thấp nhất',
        value: 'priceDesc',
    },
];

const dataSelectPrice = [
    {
        name: 'Tất cả',
        value: 'default',
    },
    {
        name: 'Dưới 3 triệu',
        value: '0-3000000',
    },
    {
        name: 'Từ 3 triệu - 6 triệu',
        value: '3000000-6000000',
    },
    {
        name: 'Từ 6 triệu - 9 triệu',
        value: '6000000-9000000',
    },
    {
        name: 'Trên 9 triệu',
        value: '9000000',
    },
];

const dataQuestionsAndAnswers = [
    {
        question: 'Điều kiện đăng ký tour như thế nào?',
        answer: 'Để đăng ký đi tour Quý khách cần chuẩn bị Chứng minh nhân dân (còn hạn sử dụng) đối với tour du lịch trong nước, và Hộ chiếu (còn hạn trên 6 tháng) đối với tour du lịch nước ngoài, ngoài ra đối với một số nước thì sẽ Quý khách sẽ phải chuẩn bị thêm hồ sơ để xin visa, hồ sơ sẽ theo yêu cầu của Lãnh sự quán/ Đại sứ quán quy định.',
    },
    {
        question:
            'Cần phải đăng ký tour trước bao lâu? Hồ sơ cần phải chuẩn bị trước bao lâu?',
        answer: 'Kính chào Quý khách, để đảm bảo có chỗ ngồi tốt và hành trình du lịch được chuẩn bị sẵn, Quý khách nên đăng ký ít nhất trước 1 tháng so với ngày khởi hành, riêng đối với các tour cần phải xin visa thì Quý khách phải chuẩn bị hồ sơ để xin visa theo yêu cầu cụ thể của từng nước đến.',
    },
    {
        question: 'Khách lớn tuổi đi tour cần điều kiện gì?',
        answer: 'Đối với khách nữ từ 55 tuổi trở lên và khách nam từ 60 trở lên: Du lịch OH Travel khuyến cáo nên có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng để có thể kịp thời hỗ trợ nếu có vấn đề xảy ra khi đi tour. Riêng khách từ 70 tuổi trở lên: Bắt buộc phải có người thân dưới 55 tuổi (đầy đủ sức khỏe) đi cùng và nộp kèm giấy khám sức khỏe, trong đó có xác nhận đủ sức khỏe để đi du lịch của bác sĩ + Giấy cam kết sức khỏe theo mẫu qui định của công ty.',
    },
    {
        question: 'Khách dưới 18 tuổi đăng ký tour thì cần điều kiện gì?',
        answer: 'Quý khách dưới 18 tuổi phải có Bố/Mẹ hoặc người nhà trên 18 tuổi đi cùng. Trường hợp quý khách dưới 18 tuổi đi cùng người thân thì Bố và Mẹ phải ủy quyền (có xác nhận của chính quyền địa phương) cho người thân.',
    },
    {
        question:
            'Tôi có thể thanh toán tiền mặt ở đâu? Có cần phải đến công ty không?',
        answer: 'Với trường hợp thanh toán bằng tiền mặt hoặc cà thẻ ngân hàng, quý khách có thể thanh toán tại Trụ sở chính: 190 Tòa nhà Ladeco, 266 Đội Cấn, Ba Đình, Hà Nội hoặc bất kì Văn phòng nào của OH Travel. Hiện tại, OH Travel đang có 04 văn phòng bán lẻ tại các quận thành phố Hà Nội và Hồ Chí Minh và các chi nhánh tại các tỉnh thành Việt Nam.',
    },
    {
        question:
            'Giá tour đã bao gồm VAT chưa? Tôi muốn xuất hóa đơn được không?',
        answer: 'Tất cả các tour đều có quy định rất rõ cho từng tour về thuế VAT, trường hợp khách có yêu cầu xuất hóa đơn, vui lòng cung cấp đầy đủ thông tin xuất hóa đơn ngay khi đăng ký tour và thanh toán hết. Hóa đơn sẽ được xuất sau khi kết thúc tour và được gửi về địa chỉ theo yêu cầu của quý khách hoặc lấy trực tiếp. Không nhận xuất hóa đơn sau khi tour khởi hành.',
    },
];

export { dataNav, dataListSort, dataQuestionsAndAnswers, dataSelectPrice };
