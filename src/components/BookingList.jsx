import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import BookingItem from "./BookingItem";
import EditBookingModal from "./EditBookingModal";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBooking, setSelectedBooking] = useState(null); // State for the booking to edit
    const [showEditModal, setShowEditModal] = useState(false); // State to show edit modal

    const url = "https://9d75cad4-19fa-47f5-8c80-fd25fe460c0f-00-2q03qxh1mro51.sisko.repl.co"

    // Fetch bookings based on user id
    const fetchBookings = (userId) => {
        fetch(`${url}/bookings/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
            });
    };

    const handleEdit = (id) => {
        const bookingToEdit = bookings.find((booking) => booking.id === id);
        setSelectedBooking(bookingToEdit); // Set the booking to be edited
        setShowEditModal(true); // Show the edit modal
    };

    const handleDelete = (id) => {
        // Delete booking from the server
        fetch(`${url}/bookings/${id}`, {
            method: "DELETE",
        })
            .then(() => {
                // Remove the deleted booking from the state
                setBookings(bookings.filter((booking) => booking.id !== id));
            })
            .catch((error) => console.error("Error deleting booking:", error));
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchBookings(userId);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <Col sm={10} className="bg-light" style={{ border: "1px solid lightgrey" }}>
            {loading ? (
                <div>Loading...</div>
            ) : bookings.length > 0 ? (
                bookings.map((booking) => (
                    <BookingItem
                        key={booking.id}
                        id={booking.id}
                        title={booking.title}
                        description={booking.description}
                        date={booking.date}
                        time={booking.time}
                        phoneNumber={booking.phone_number}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))
            ) : (
                <p>No bookings found for this user.</p>
            )}

            {/* Edit Booking Modal */}
            {showEditModal && (
                <EditBookingModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    booking={selectedBooking}
                    onUpdateBooking={(updatedBooking) => {
                        setBookings(bookings.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
                        setShowEditModal(false);
                    }}
                />
            )}
        </Col>
    );
}
