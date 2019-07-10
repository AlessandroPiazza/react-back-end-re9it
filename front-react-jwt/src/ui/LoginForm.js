import 'bootstrap/dist/css/bootstrap.css'
// import ReactDOM from "react-dom";

import React, { Component } from 'react';
import { Form, FormGroup, Input, Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';

export default class Login extends Component{
    
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.email = React.createRef();
        this.password = React.createRef();
        
    
        this.state ={
            email: undefined,
            password: undefined,
            isOpen: false,
            signUp: {
                success: undefined,
                message: undefined
            },
            logged: false
        }
    }
    static displayName="Login"
    componentDidMount(){
    
    }
    isAuthorized(){
        if(this.state.logged){
            return true;
        }else{
            return false;
        }
    }
    //Register
    
    handleSignUpSubmit(e){
        e.preventDefault();
        let dataToSend = {
            userData: {
                email: this.state.email,
                password: this.state.password
            }
        }
        const url="http://localhost:3002/users/register";
        
        axios.post(url, dataToSend,{
        })
        .then(function (response){
            console.log(response.data)
            
        })
        .catch(function (error){
            console.log(error);
        })
    }
    
    //Login 
    
    handleSubmit(e){
        e.preventDefault();
        let dataToSend = {
            userData: {
                email: this.state.email,
                password: this.state.password
            }
            
        }
        console.log(dataToSend);
        
        const url = 'http://localhost:3002/auth/login';
        
        axios.post(url, dataToSend,{
        })
        .then(function (response){
            console.log(response.data)
            localStorage.setItem('TOKEN', response.data.token);
        })
        .catch(function (error){
            console.log(error);
            
        })
        
        
    }
    handleEmailChange(e){
        this.setState({
            email: e.target.value
        });
    }
    
    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        });
    }
    handleClose() {
        this.setState({ 
            isOpen: false });
        }
        
        handleShow() {
            this.setState({ 
                isOpen: true });
            }
            
            
            
            state = { show: false };
            
            render(){
                return (
                    <div className="row d-flex justify-content-center">

            <div className="col-md-6 mt-5">
                <h1>Login</h1>
                <hr className="my-3"/>
                
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label htmlFor="email">Email</label>
                        <Input type="text" onChange={ this.handleEmailChange } id="email"  placeholder=""/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <Input type="password" id="password" onChange={ this.handlePasswordChange } placeholder=""/>
                    </FormGroup>
                    <Button color="success" block onClick={this.signIn}>Sign in</Button>
                </Form>
                <Button className="mt-1" variant="primary" onClick={this.handleShow} block>
                Sign up
                </Button>

                <Modal  isOpen={this.state.isOpen} >
                <ModalHeader>
                    Register
                </ModalHeader>
                <ModalBody>

                {
                    
                    this.state.signUp.success !== undefined ? (
                        this.state.success ?
                        <div class="alert alert-success" role="alert">
                            Success
                        </div>
                        :
                        <div class="alert alert-danger" role="alert">
                            Failure
                        </div>
                    ): ''
                    
                }

                <Form onSubmit={this.handleSignUpSubmit}>
                    <FormGroup>
                        <label htmlFor="email">Email</label>
                        <Input type="text" onChange={ this.handleEmailChange }   placeholder=""/>
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="password">Password</label>
                        <Input type="password" onChange={ this.handlePasswordChange } placeholder=""/>
                    </FormGroup>
                    <Button type="submit" color="success" block onClick={this.signIn}>Create an user</Button>
                </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={this.handleClose}>
                    Close
                    </Button>
                    
                </ModalFooter>
                </Modal>
            </div>
        </div>
        )
    }
}