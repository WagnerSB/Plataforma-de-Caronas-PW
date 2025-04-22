import Form from 'react-bootstrap/Form';

function CampoCheckbox({ value, name, label,
    requerido, id, onchange,
    msgvalido, msginvalido, readonly }) {
    return (
        <Form.Group controlId={id} className="mb-3">
            <Form.Check type='checkbox' label={label} required={requerido} name={name}
                checked={value}
                onChange={onchange} disabled={readonly} />
            <Form.Control.Feedback type="invalid">
                {msginvalido}
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">
                {msgvalido}
            </Form.Control.Feedback>
        </Form.Group>
    )
}

export default CampoCheckbox;
