import React, { Component } from 'react';
import db from '../FirestoreConfig';
import { Table, Button, Row, Col, Input, InputGroup } from 'reactstrap';

class Todos extends Component {

    constructor(){
        super()
        this.state = {
            items:[],
            inputValue: "",
            edit: false
        }
    }

    componentDidMount() {
        db.collection('todo').onSnapshot((snapShots) => {
            this.setState({
                items: snapShots.docs.map( doc => {
                        return {
                            id: doc.id,
                            data: doc.data()
                        }
                    }
                )
            })
        })
    }
    
    handleOnChange = (e) => {
        console.log(e)
        this.setState({
            inputValue: e.target.value
        })
    }

    handleOnClick = (e) => {
        e.preventDefault()
        const {inputValue,edit} = this.state

        !edit ? 

        db.collection('todo').add({
            item: inputValue
        }).then( () => {
            console.log('Texto agregado')
            
        }).catch((err => console.log(err)
        )) : 
        this.update()
    }

    update = () => {
        const {id, inputValue} = this.state

        db.collection('todo').doc(id).update({
            item: inputValue
        }).then( () => {
            console.log('actualizado')
        }).catch((err) => console.log(err))
    }
    getTodo = (id) =>{
        let docRef = db.collection('todo').doc(id)

        docRef.get().then((doc) => {
            if(doc.exists){
                this.setState({
                    inputValue: doc.data().item,
                    edit: true,
                    id: doc.id
                })
            }else {
                console.log('El documento no existe')
            }

        })
    }

    render() {
        const {items,inputValue} = this.state
        return (
            <div>
                <Row>
                    <Col xs="10">
                        <InputGroup>
                            <Input
                                placeholder="Agregar un nuevo Item"
                                value={inputValue}
                                onChange={this.handleOnChange}
                            />
                        </InputGroup>
                    </Col>
                    <Col xs="2">
                        <div className="text-right">
                            <Button color='info' onClick={this.handleOnClick}>
                                {
                                    this.state.edit ? 'Editar' : 'Agregar' 
                                }
                            </Button>
                        </div>
                    </Col>
                </Row>
                <br />
                <Table hover className="text-center">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items && items !== undefined ? items.map( item => {
                                return <tr key={item.id}>
                                    <td>{item.data.item}</td>
                                    <td> <Button color='warning' onClick={() => this.getTodo(item.id)} >Editar</Button> </td>
                                    <td> <Button color='danger'>Eliminar</Button> </td>
                                </tr>
                            }) : null
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Todos;