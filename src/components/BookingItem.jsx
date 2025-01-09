import { Row, Col, Button } from "react-bootstrap";

export default function BookingItem({
    id,
    title,
    description,
    date,
    time,
    phoneNumber,
    onEdit,
    onDelete,
}) {
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
                <p>{date} at {time}</p>
                <p>Booked under: {phoneNumber}</p>
                <div className="d-flex justify-content-start gap-3">
                    <Button variant="warning" onClick={() => onEdit(id)}>Edit</Button>
                    <Button variant="danger" onClick={() => onDelete(id)} className="ml-2">Delete</Button>
                </div>
            </Col>
        </Row>
    );
}
