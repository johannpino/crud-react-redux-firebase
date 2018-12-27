import React, { Component } from 'react';
import db from '../FirestoreConfig';
import { Table, Button, Row, Col, Input, InputGroup, Fade } from 'reactstrap';

class Todos extends Component {

    constructor(){
        super()
        this.state = {
            items:[],
            inputValue: "",
            edit: false,
            fadeIn: false,
            message:''
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
            this.message('Agregado')
            
        }).catch((err => console.log(err)
        )) : 
        this.update()
    }

    update = () => {
        const {id, inputValue} = this.state

        db.collection('todo').doc(id).update({
            item: inputValue
        }).then( () => {
            this.message('Actualizado')
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

    deleteItem = (id) => {
        db.collection('todo').doc(id).delete()
    }

    message = (message) => {
        this.setState({
            fadeIn:true,
            message: message
        })

        setTimeout( () => {
            this.setState({
                fadeIn: false,
                inputValue: "",
                edit:false
            })
        }, 3000)

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
                <Fade in={this.state.fadeIn} tag="h6" className="mt-3 text-center text-success">
                    {this.state.message}
                </Fade>
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
                                    <td> <Button color='danger' onClick={() => this.deleteItem(item.id)}>Eliminar</Button> </td>
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