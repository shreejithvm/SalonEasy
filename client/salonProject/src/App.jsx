import {Route,Routes} from 'react-router-dom'
import UserHome from './components/UserHome'
import {ToastContainer} from "react-toastify"
import Register from "./components/Register"
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import StaffHome from './components/StaffHome'
import UserProfile from './components/UserProfile'
import MyBookings from './components/MyBookings'
import EditUserProfile from './components/EditUserProfile'
import CreateStaffProfle from './components/CreateStaffProfile'
import StaffProfile from './components/StaffProfile'
import AvailableStaff from './components/AvailableStaff'
import Booking from './components/Booking'
import Payment from './components/Payment'
import AdminProfile from './components/AdminProfile'
import AdminstaffsList from './components/AdminstaffsList'
import Adminusers from './components/Adminusers'
import EditStaffProfile from './components/EditStaffProfile'
import ForgotPassword from './components/ForgotPassword'
import ResetPassword from './components/ResetPassword'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<UserHome/>}/>
      <Route path='staff/home' element={<StaffHome/>}/>
      <Route path='register' element={<Register/>}/>
      <Route path='login/' element={<Login/>}/>
      <Route path='admin/dash' element={<AdminDashboard/>}/>
      <Route path='user/profile' element={<UserProfile/>}/>
      <Route path='bookings' element={<MyBookings/>}/>
      <Route path='edit/user' element={<EditUserProfile/>}/>
      <Route path='create/staff/profile' element={<CreateStaffProfle/>}/>
      <Route path='staff/profile' element={<StaffProfile/>}/>
      <Route path='available' element={<AvailableStaff/>}/>
      <Route path='booking' element={<Booking/>}/>
      <Route path='/payment' element={<Payment/>}/>
      <Route path='adprofile' element={<AdminProfile/>}/>
      <Route path='staffslist' element={<AdminstaffsList/>}/>
      <Route path='customers/list' element={<Adminusers/>}/>
      <Route path='edit/staff' element={<EditStaffProfile/>}/>
      <Route path='forgot-password' element={<ForgotPassword/>}/>
      <Route path='/reset/:uid/:token' element={<ResetPassword/>}/>

    </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>

  )
}

export default App
