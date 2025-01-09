import { Container, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import useLocalStorage from "use-local-storage"
import HomeNavBar from "../components/HomeNavBar";
import BookingList from "../components/BookingList";

export default function HomePage() {
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")
    const navigate = useNavigate()

    useEffect(() => {
        if (!authToken) {
            navigate("/login");
        }
    }, [authToken, navigate])

    const handleLogout = () => {
        setAuthToken("");
    };

    return (
        <>
            <Container>
                <Row>
                    <HomeNavBar handleLogout={handleLogout} />
                    <BookingList />
                </Row>
            </Container>
        </>
    );
}


