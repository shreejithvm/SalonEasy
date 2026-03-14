import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getStaffProfile } from '../api/fetchApi'
import { toast } from 'react-toastify';
import { staffProfileupdate } from '../api/fetchApi';


function EditStaffProfile() {

  const [show, setShow] = useState(false);

  
  const [profile, setProfile] = useState({
    id: "",
    user: {
      username: "",
      email: ""
    },
    specialization: "",
    staff_phone: "",
    price: "",
    staff_profile: "",
    is_active: true

  });

  const headers = {
    "Authorization": `Token ${sessionStorage.getItem("token")}`,
    

  }

  useEffect(() => {
    getStaffProfile(headers).then((res) => {
      console.log(res.data);
      setProfile(res.data)

    })
  }, [])

  const formSubmit =()=>{
  const {staff_phone,price,staff_profile}=profile;

  if(!staff_phone || !price){
    toast("Invalid data")
    return
  }

  const formData=new FormData();
  formData.append("staff_phone",staff_phone);
  formData.append("price",price);
  formData.append("staff_profile",staff_profile);


    staffProfileupdate(formData,profile.id,headers).then(() => {
            toast("Profile Updated Successfully");
            setShow(false);
          })
          .catch((err) => {
            console.log(err.response?.data);
            
            toast("Something went wrong");
          });
  
};

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FloatingLabel label="Phone" className="mt-3">
            <Form.Control type="text" value={profile.staff_phone}  onChange={(e) => setProfile({ ...profile, staff_phone: e.target.value})}/>
          </FloatingLabel>

          <FloatingLabel label="price" className="mt-3">
            <Form.Control type="text" value={profile.price}  onChange={(e) => setProfile({ ...profile, price: e.target.value })}/>
          </FloatingLabel>




          <FloatingLabel label="Profile Picture" className="mt-3">
            <Form.Control type="file"  onChange={(e) => setProfile({ ...profile, staff_profile: e.target.files[0] })}/>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={formSubmit}>

            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default EditStaffProfile