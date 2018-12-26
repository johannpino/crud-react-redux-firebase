import React from 'react';
import {Row,Col,Jumbotron} from 'reactstrap'

const Title = () => {
    return (
        <Row className="text-center">
            <Col xs='12'>
                <Jumbotron>
                    <h1 className="display-5">Todo App</h1>
                    <p className="lead">ReactJs + Firestore</p>
                </Jumbotron>
            </Col>
        </Row>
    );
};

export default Title;