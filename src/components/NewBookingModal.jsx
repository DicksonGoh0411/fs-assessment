import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

export default function NewPostModal({ show, handleClose }) {
    const [bookingTitle, setBookingTitle] = useState("");
    const [bookingDescription, setBookingDescription] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const url = import.meta.env.VITE_API_URL;

    const handleSave = () => {
        //Get stored JWT Token
        const token = localStorage.getItem("authToken");

        //Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id

        //Prepare data to be sent
        const data = {
            title: bookingTitle,
            description: bookingDescription,
            date: bookingDate,
            time: bookingTime,
            phone_number: phoneNumber,
            user_id: userId,
        };

        //Make your API call here
        axios
            .post(`${url}/bookings`, data)
            .then((response) => {
                console.log("Success:", response.data);
                handleClose();
            })
            .catch((error) => {
                console.error("Error", error);
            });
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="bookingTitle">
                            <Form.Label>Booking Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Booking Title"
                                onChange={(e) => setBookingTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="bookingDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                placeholder="Enter any descriptions"
                                as="textarea"
                                rows={3}
                                onChange={(e) => setBookingDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="bookingDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="(DD/MM/YYYY)"
                                onChange={(e) => setBookingDate(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="bookingTime">
                            <Form.Label>Time</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="12:00PM"
                                onChange={(e) => setBookingTime(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="phoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="012-3456789"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        className="rounded-pill"
                        onClick={handleSave}
                    >
                        Create
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

