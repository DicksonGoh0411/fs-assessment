import BookingItem from "./BookingItem";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

export default function BookingList() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bookings based on user id
    const fetchBookings = (userId) => {
        fetch(`https://9d75cad4-19fa-47f5-8c80-fd25fe460c0f-00-2q03qxh1mro51.sisko.repl.co/bookings/user/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setBookings(data);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false); // Stop loading if an error occurs
            });
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            fetchBookings(userId);
        } else {
            setLoading(false); // No token, stop loading
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
                        title={booking.title}
                        description={booking.description}
                        date={booking.date}
                        time={booking.time}
                        phoneNumber={booking.phone_number}
                    />
                ))
            ) : (
                <p>No bookings found for this user.</p> // If no bookings are found
            )}
        </Col>
    );
}
