import { Row, Col } from "react-bootstrap";

export default function BookingItem({ title, description, date, time, phoneNumber }) {
    return (
        <Row
            className="p-3"
            style={{
                borderTop: "1px solid #D3D3D3",
                borderBottom: "1px solid #D3D3D3",
            }}
        >
            <Col>
                <h5>{title}</h5>
                <p>{description}</p>
                <p>
                    {date} at {time}
                </p>
                <p>Booked under: {phoneNumber}</p>
            </Col>
        </Row>
    );
}
