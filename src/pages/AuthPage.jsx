import { Col, Image, Row, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import useLocalStorage from "use-local-storage"
import { useNavigate } from "react-router-dom"

export default function AuthPage() {
    const loginImage = "https://astrotowing.ca/wp-content/uploads/2020/08/Vertical-Placeholder-Image.jpg";
    const url = import.meta.env.VITE_API_URL;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authToken, setAuthToken] = useLocalStorage("authToken", "")

    const navigate = useNavigate();

    useEffect(() => {
        if (authToken) {
            navigate("/home")
        }
    }, [authToken, navigate])

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/signup`, { email, password });
            console.log(res.data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${url}/login`, { email, password })
            if (res.data && res.data.auth === true && res.data.token) {
                setAuthToken(res.data.token);
                console.log("Login successful, token saved");
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Row>
            <Col sm={6}>
                <Image src={loginImage} fluid style={{ backgroundSize: "cover", backgroundPosition: "center" }} />
            </Col>
            <Col sm={6} className="p-4">
                <p className="mt-5" style={{ fontSize: 64 }}>Name goes here</p>
                <h2 className="my-5" style={{ fontSize: 31 }}>Booking App</h2>

                <Col sm={6} style={{ marginLeft: "-25px", marginBottom: "20px" }}>
                    <Form className="d-grid gap-2 px-5" onSubmit={handleLogin}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                        </Form.Group>

                        <Button className="rounded-pill" type="submit">Login</Button>
                    </Form>
                </Col>

                <Col sm={5} className="d-grid gap-2">
                    <p style={{ textAlign: "center" }}>or</p>
                    <Button className="rounded-pill" variant="outline-dark" onClick={handleShow}>Create an account</Button>
                    <p style={{ fontSize: "12px" }}>
                        By signing up, vou agree to the Terms of Service and Privacy Policy including Cookie Use
                    </p>
                </Col>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                        <h2 className="mb-4" style={{ fontWeight: "bold" }}>Create your account</h2>
                        <Form className="d-grid gap-2 px-5" onSubmit={handleSignUp}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
                            </Form.Group>

                            <Button className="rounded-pill" type="submit">Sign Up</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Col>
        </Row >
    )
}