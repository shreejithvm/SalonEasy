import React, { useEffect ,useState} from "react";
import { useNavigate } from "react-router-dom";
import { getStaffProfile, getUserData } from "../api/fetchApi";
import CreateStaffProfle from './CreateStaffProfile'
import { Link } from "react-router-dom";
import { myorders } from "../api/fetchApi";
function StaffHome() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or staffToken
    navigate("/login");
  };
  
const [profile, setProfile] = useState(null);
const [order,setOrder]=useState([])

const [user,setUser]=useState({
  id:"",
  username:""
})


    const header = {
    "Authorization": `token ${sessionStorage.getItem("token")}`,
    
  }


useEffect(() => {
  getUserData(header).then((res) => {
    setUser(res.data);
    console.log(res.data);
    
  });

  getStaffProfile(header)
    .then((res) => {
      setProfile(res.data); // 👈 object
      console.log(res.data);
      
    })
    .catch((err) => {
      if (err.response?.status === 404) {
        setProfile(null); // profile not created
      }
    });
    myorders(header).then((res)=>{
      console.log(res.data);
        const orders=res.data

        const cur_date=new Date
        const year=cur_date.getFullYear()
        const m=cur_date.getMonth()+1
        const month=m.toString().padStart(2,0)
        const d=cur_date.getDate()
        const day=d.toString().padStart(2,0)
        console.log(day);
        const today=`${year}-${month}-${day}`
        console.log(today);
        const allorders=orders?.filter((serv)=>(serv.booking_date==today))
        console.log(allorders);
        setOrder(allorders)
    }

    )
}, []);


const isProfile = Boolean(profile);

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* SIDEBAR */}
      <div
        className="bg-dark text-white p-4"
        style={{ width: "240px" }}
      >
        <h4 className="text-center mb-4">Staff Panel</h4>

        <ul className="nav nav-pills flex-column gap-2">
          <li className="nav-item">
            <button className="btn btn-dark w-100 text-start active">
              📅 Appointments
            </button>
          </li>

         <li className="nav-item">
  {isProfile ? (
    <Link
      to="/staff/profile/"
      className="btn btn-dark w-100 text-start active"
    >
      🙎 View Profile
    </Link>
  ) : (
    <CreateStaffProfle />
  )}
</li>


          <li className="nav-item mt-3">
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-grow-1 p-5 bg-light">
        <div className="border shadow p-4 bg-warning rounded">
          <h3 className="mb-4">Today's Appointments</h3>

          <table className="table table-bordered table-striped bg-white">
            <thead className="table-secondary">
              <tr>
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Service</th>
                <th>Price</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>

            <tbody>
              {
                 order.length > 0 ?
                     order.map((res) =>(
                    <tr>
                        <td>{res.user.username}</td>
                        <td>{res.user.email}</td>
                        <td>{res.staff.specialization}</td>
                        <td>{res.staff.price}</td>
                        <td>{res.booking_date}</td>
                        <td>{res.booking_time}</td>
                        {/* <td>
                            <Link to={`service/${serv.customer.id}`}className="btn btn-outline-danger" fdprocessedid="m0qhzl">Services</Link>
                            
                        </td> */}
                    </tr>
                 ))
                 :<b>No Orders</b>




                }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default StaffHome;
