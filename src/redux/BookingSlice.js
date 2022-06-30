// store/BookingSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
    dataBooking: null,
};

// Cấu hình slice
export const BookingSlice = createSlice({
    name: "booking",  // Tên của slice, m  ỗi slice đặt 1 tên khác nhau để phân biệt
    initialState,
    // Reducers chứa các hàm xử lý cập nhật state
    reducers: {
        updateDataBooking: (state, action) => {
            console.log("Check redux: ", action);
            state.dataBooking = action.payload;
        },

    }
});

// Export action ra để sử dụng cho tiện.
export const { updateDataBooking } = BookingSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết

export const dataBookingRedux = state => state.booking;

// Export reducer để nhúng vào Store
export default BookingSlice.reducer;