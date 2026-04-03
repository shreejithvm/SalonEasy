import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { getUserProfile, updateUserProfile } from '../api/fetchApi';
import { toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom'
function EditUserProfile() {
  const [show, setShow] = useState(false);

  const [profile, setProfile] =  useState({
      user: { id: "", username: "", password: "" }, phone: "", profile_pic: null
    })



  const headers = {
    Authorization: `Token ${sessionStorage.getItem("token")}`,
    
  };

useEffect(()=>{
  getUserProfile(headers).then((res)=>{
    console.log(res.data);
    setProfile(res.data)
    

  })
},[])




  const formsubmit = () => {
    const { phone, profile_pic } = profile;

    if (!phone ) {
      toast("Invalid data");
      return;
    }

    const formdata = new FormData();
    formdata.append("phone", phone);
    formdata.append("profile_pic", profile_pic);

    updateUserProfile(formdata, profile.id, headers )
      .then(() => {
        toast("Profile Updated Successfully");
        setShow(false);
      })
      .catch(() => {
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
          <FloatingLabel label="Profile Picture">
            <Form.Control type="file" onChange={(e) => setProfile({ ...profile, profile_pic: e.target.files[0] })}/>
          </FloatingLabel>

          <FloatingLabel label="Phone" className="mt-3">
           <Form.Control type="text" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })}/>
          </FloatingLabel>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={formsubmit} >
            
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditUserProfile