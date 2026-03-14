import commonApi from "./commonApi";

export const register=(data)=>{
    return commonApi("http://127.0.0.1:8000/register/","POST",data,"")

}
export const userLogin=(data)=>{
    return commonApi("http://127.0.0.1:8000/login/","POST",data)

}
export const adminLogin=(data)=>{
    return commonApi("http://127.0.0.1:8000/token","POST",data)

}

export const getUserData=(header)=>{
    return commonApi("http://127.0.0.1:8000/get/user","GET","",header)
}

export const getUserProfile=(header)=>{
    return commonApi(`http://127.0.0.1:8000/profile/me/`,"GET","",header)
}

export const updateUserProfile=(data,id ,headers)=>{
    return commonApi(`http://127.0.0.1:8000/profile/${id}/`,"PUT",data,headers)
}
export const getStaffProfile=(headers)=>{
    return commonApi(`http://127.0.0.1:8000/staff/profile/`,"GET","",headers)
}

export const getStaffProfileByID=(id,headers)=>{
    return commonApi(`http://127.0.0.1:8000/staffs/${id}/`,"GET","",headers)
}

export const addStaffProfile=(data,headers)=>{
    return commonApi(`http://127.0.0.1:8000/staff/profile/create/`,"POST",data,headers)
}

export const staffsList=(headers)=>{
    return commonApi(`http://127.0.0.1:8000/staffs/`,"GET","",headers)
}

export const staffProfileupdate=(data,id,headers)=>{
    return commonApi(`http://127.0.0.1:8000/staffs/${id}/`,"PATCH",data,headers)
}

export const staffsAvail=(specialization,headers)=>{
    return commonApi(`http://127.0.0.1:8000/staffrole/?specialization=${specialization}`,"GET","",headers)
}

export const getslot=(staff,date,headers)=>{
    return commonApi(`http://127.0.0.1:8000/booked/?staff=${staff}&date=${date}`,"GET","",headers)
}

export const createBooking=(data,headers)=>{
    return commonApi(`http://127.0.0.1:8000/create/book/`,"POST",data,headers)
}

export const getbookDetail=(id,headers)=>{
    return commonApi(`http://127.0.0.1:8000/booking/${id}/`,"GET","",headers)
}

export const createPayment =(bookingId, headers) => {
  return commonApi("http://127.0.0.1:8000/create-payment/","POST",{booking_id:bookingId},headers)
}

export const verifyPayment =(response, headers) => {
  return commonApi("http://127.0.0.1:8000/verify-payment/","POST",response,headers)
}

export const myBooking =(headers) => {
  return commonApi("http://127.0.0.1:8000/mybook/","GET","",headers)
}

export const myorders =(headers) => {
  return commonApi("http://127.0.0.1:8000/staff/orders/getMyorder/","GET","",headers)
}

export const getallorders =(headers) => {
  return commonApi("http://127.0.0.1:8000/booking/get_allorders/","GET","",headers)
}

export const getallStaffs =(headers) => {
  return commonApi("http://127.0.0.1:8000/staff/orders/","GET","",headers)
}

export const getallcustomers=(headers) => {
  return commonApi("http://127.0.0.1:8000/user/get_users/","GET","",headers)
}

export const deleteuser=(id,headers) => {
  return commonApi(`http://127.0.0.1:8000/user/${id}/`,"DELETE","",headers)
}

export const staffApprove=(id,data,headers)=>{
    return commonApi(`http://127.0.0.1:8000/staff-status/${id}/`,"PATCH",data,headers)
}

export const CancelOrder=(id,headers)=>{
    return commonApi(`http://127.0.0.1:8000/delete/myroder/${id}/`,"DELETE",'',headers)
}



export const forgotpassword = (body) => {
  return commonApi(
    "http://127.0.0.1:8000/forgot-password/",
    "POST",
    body,
    {
      "Content-Type": "application/json"
    }
  )
}

export const resetpassword = (uid, token, body) => {
  return commonApi(
    `http://127.0.0.1:8000/reset-password/${uid}/${token}/`,
    "POST",
    body,
    {
      "Content-Type": "application/json"
    }
  );
};