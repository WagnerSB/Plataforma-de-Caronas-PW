import Spinner from 'react-bootstrap/Spinner';

export default function Carregando(props) {
    return (
        <>
            {
                !props.carregando ? props.children :
                    <div className="d-flex align-items-center m-5">
                        <Spinner animation="border" variant="primary" 
                        style={{ width: '4rem', height: '4rem' }}
                        />
                    </div>
            }
        </>
    )
}