import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import { addStaffProfile } from '../api/fetchApi'

function CreateProfile() {

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const header = {
  "Authorization": `token ${sessionStorage.getItem("token")}`,
  "Content-Type": "multipart/form-data",
}


  const [profile, setProfile] = useState({
  specialization: "",
  staff_phone: "",
  price: "",
  staff_profile: "",
})

const formsubmit = () => {
  const { specialization, staff_phone, price, staff_profile } = profile

  if (!specialization || !staff_phone || !price || !staff_profile) {
    toast("Invalid data")
    return
  }

  const formdata = new FormData()
  formdata.append("specialization", specialization)
  formdata.append("staff_phone", staff_phone)
  formdata.append("price", price)
  formdata.append("staff_profile", staff_profile)

  addStaffProfile(formdata, header)
    .then(() => {
      toast("Profile Created Successfully")
      handleClose()
    })
    .catch(() => {
      toast("Something went wrong")
    })
}





  return (
    <>
      <button className="btn btn-dark w-100 text-start active" onClick={handleShow}>
        🙎 Profile
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form.Select aria-label="Default select example" onChange={(e) => { setProfile({ ...profile, specialization: e.target.value }) }}>
            <option value="">Select role</option>
            <option value="HAIR">HAIR</option>
            <option value="SKIN">SKIN</option>
            <option value="NAILS">NAILS</option>
          </Form.Select>

          <FloatingLabel controlId="phone" label="Phone" className='mt-2' >
            <Form.Control type='text' placeholder="Phone"  onChange={(e) => { setProfile({ ...profile, staff_phone: e.target.value }) }} />
          </FloatingLabel>

          <FloatingLabel controlId="Price" label="Price" className='mt-2' >
            <Form.Control type='text' placeholder="title"  onChange={(e) => { setProfile({ ...profile, price: e.target.value }) }} />
          </FloatingLabel>

          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file" onChange={(e) => setProfile({ ...profile, staff_profile: e.target.files[0] })} />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formsubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateProfile
