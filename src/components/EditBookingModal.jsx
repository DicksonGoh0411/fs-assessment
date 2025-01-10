import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function EditBookingModal({ show, handleClose, booking, onUpdateBooking }) {
    const [bookingTitle, setBookingTitle] = useState(booking?.title || "");
    const [bookingDescription, setBookingDescription] = useState(booking?.description || "");
    const [bookingDate, setBookingDate] = useState(booking?.date || "");
    const [bookingTime, setBookingTime] = useState(booking?.time || "");
    const [phoneNumber, setPhoneNumber] = useState(booking?.phone_number || "");

    const url = import.meta.env.VITE_API_URL;

    const handleSave = () => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        const data = {
            title: bookingTitle,
            description: bookingDescription,
            date: bookingDate,
            time: bookingTime,
            phone_number: phoneNumber,
            user_id: userId,
        };

        if (booking?.id) {
            // Update existing booking
            axios
                .put(`${url}/bookings/${booking.id}`, data)
                .then((response) => {
                    onUpdateBooking(response.data); // Update the booking in the parent component
                    handleClose();
                })
                .catch((error) => console.error("Error updating booking:", error));
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="bookingTitle">
                        <Form.Label>Booking Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookingTitle}
                            onChange={(e) => setBookingTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="bookingDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={bookingDescription}
                            onChange={(e) => setBookingDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="bookingDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="bookingTime">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="text"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="phoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSave}>
                    Update Booking
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
