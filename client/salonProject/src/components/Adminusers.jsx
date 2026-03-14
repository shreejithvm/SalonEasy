import React, { useEffect, useState } from 'react'
import { getallcustomers } from '../api/fetchApi'
import { Row, Col, Container, Card, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { deleteuser } from '../api/fetchApi';
import { toast } from 'react-toastify';
function Adminusers() {

    const navigate=useNavigate()

    const header = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    'content-type': 'application/json'
  }
    const[customers,setcustomers]=useState([])

    useEffect(()=>{
        getallcustomers(header).then((res)=>{
            console.log(res.data);
            setcustomers(res.data)
            
        })
    },[])

const DeleteData=(id)=>{
    deleteuser(id,header).then(res=>{
        console.log(res.data);
        toast("User data deleted ✅")

        
    })

}

  return (
    <>
     <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container fluid className="d-flex align-items-center">

          {/* LEFT SIDE: Home Button */}
          <div className="flex-1 d-flex justify-content-start">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => navigate('/admin/dash')}
            >
              Back
            </Button>
          </div>

          {/* CENTER: Title */}
          <div className="text-center" style={{ flex: 2 }}>
            <Navbar.Brand className="fw-bold m-0 p-0">
              Total Staffs
            </Navbar.Brand>
          </div>



        </Container>
      </Navbar>

      <div className="flex-grow-1 p-5 bg-light">
        <div className="border shadow p-4 bg-danger rounded">
          <h3 className="mb-4"> </h3>

          <table className="table table-bordered table-striped bg-white">
            <thead className="table-secondary">
              <tr>
                <th style={{ textAlign: 'center' }}>Customer Name</th>
                <th style={{ textAlign: 'center' }}>Customer Email</th>
                <th style={{ textAlign: 'center' }}>Delete user</th>

              </tr>
            </thead>

             <tbody>
              {
                customers?.length > 0 ?
                  customers.map((resl) => (
                    <tr>
                      <td>{resl.username}</td>
                      <td>{resl.email}</td>

                      <td style={{ textAlign: 'center' }}>
                        <i className="fa-solid fa-trash fa-xl" style={{ color: '#fd0808ff' }} onClick={()=>{DeleteData(resl.id)}} ></i>
                      </td>
                    </tr>
                  ))
                  : <b>No Orders</b>




              }
            </tbody>
          </table>
        </div>
      </div>


    

    
    
    </>
  )
}

export default Adminusers