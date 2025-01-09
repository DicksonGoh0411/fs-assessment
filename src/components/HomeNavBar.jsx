import { Button, Col } from "react-bootstrap";
import NewBookingModal from "./NewBookingModal";
import { useState } from "react";

export default function ProfileSideBar({ handleLogout }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    return (
        <Col sm={2} className="d-flex flex-column justify-content-start align-items-start bg-light vh-100" style={{ position: "sticky", top: 0 }}>

            <h1>ABC</h1>
            <Button className="rounded-pill w-100 mt-3" onClick={handleShow}>Add Booking</Button>
            <Button className="rounded-pill w-100 mt-3" onClick={handleLogout}>Logout</Button>
            <NewBookingModal show={show} handleClose={handleClose} />
        </Col>
    )
}