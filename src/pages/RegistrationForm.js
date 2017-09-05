import React, { Component } from 'react';
import {FormControl, Form, FormGroup, Col, ControlLabel, Radio, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class FormComponent extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  		name: "",
  		phoneNumber: "",
  		email: "",
  		birthDay: "",
  		birthMonth: "",
  		birthYear: "",
  		gender: "",
  		adress: ""
  	}
  	this.handleNameChange = this.handleNameChange.bind(this);
  	this.handleSumbit = this.handleSumbit.bind(this);
  	this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
  	this.handleEmailChange = this.handleEmailChange.bind(this);
  	this.handleBirthDayChange = this.handleBirthDayChange.bind(this);
  	this.handleBirthMonthChange = this.handleBirthMonthChange.bind(this);
  	this.handleBirthYearChange = this.handleBirthYearChange.bind(this);
  	this.handleGenderChange = this.handleGenderChange.bind(this);
  	this.handleAdressChange = this.handleAdressChange.bind(this);
  }	

  handleSumbit(event) {
  	let xhr = new XMLHttpRequest();
  	xhr.open("POST", "http://localhost:9000/register");
  	xhr.setRequestHeader('Content-Type', 'application/json');
  	console.log(this.state);
  	xhr.onreadystatechange = () => {
	   	if (xhr.readyState !== 4) return;
        alert('Клиент Добавлен');	
	    };
  	xhr.send(JSON.stringify(this.state));

    this.setState({
             name: "", 
    			   phoneNumber: "", 
    			   email: "",
			  	   birthDay: "",
			  	   birthMonth: "",
			  	   birthYear: "",
			  	   gender: "",
			  	   adress: ""
    			});
  	event.preventDefault();
  }

  handleNameChange(event) {
  	this.setState({name: event.target.value});
  }

  handlePhoneNumberChange(event) {
  	this.setState({phoneNumber: event.target.value});
  }

  handleEmailChange(event) {
  	this.setState({email: event.target.value});
  }  

  handleBirthDayChange(event) {
    if(event.target.value > 31) {
      this.setState({birthDay: 31});
    }
    else if(event.target.value < 1) {
      this.setState({birthDay: 1});
    } else {
      this.setState({birthDay: event.target.value});
    }
  	
  }
  
  handleBirthMonthChange(event) {
    if(event.target.value > 12) {
      this.setState({birthMonth: 12});
    }
    else if(event.target.value < 1) {
      this.setState({birthMonth: 1});
    } else {
      this.setState({birthMonth: event.target.value});
    }
  	
  }

  handleBirthYearChange(event) {
      this.setState({birthYear: event.target.value});
  }

  handleGenderChange(event) {
    if(event.target.value === "Мужчина") {
      this.setState({gender: 'male'});  
    } 
    else if(event.target.value === "Женщина") {
      this.setState({gender: 'female'});
    }
  }

  handleAdressChange(event) {
  	this.setState({adress: event.target.value});
  }

  render() {
    return (
    <div>
    <Link to={'/'}>Back to the List Of Clients</Link>

      <h1>Registration Form</h1>
  
      <Form horizontal>
      
        <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type="text" 
                placeholder="Имя" 
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </Col>
        </FormGroup>

        <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type='text'
            placeholder='Номер мобильного телефона'
            value={this.state.phoneNumber}
            onChange={this.handlePhoneNumberChange}
          />
            </Col>
        </FormGroup>

        <FormGroup >
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type='text'
            placeholder='E-mail'
            value={this.state.email}
            onChange={this.handleEmailChange}
          />
            </Col>
        </FormGroup>
          
        <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type='number'
                min={1}
                max={31}
                placeholder='День Рождения'
                value={this.state.birthDay}
                onChange={this.handleBirthDayChange}
              />  
            </Col>
        </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type='number'
                min={1}
                max={12}
                placeholder='Месяц Рождения'
                value={this.state.birthMonth}
                onChange={this.handleBirthMonthChange}   
          />
        </Col>
        </FormGroup>
        
        <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type='number'
                min={1907}
                max={(new Date()).getFullYear()}
                placeholder='Год Рождения'
                value={this.state.birthYear}
                onChange={this.handleBirthYearChange}
          />
          </Col>
        </FormGroup>  

        <FormGroup>
            <Col componentClass={ControlLabel} sm={4}>
            </Col>
            <Col sm={4}>
              <FormControl 
                type="text" 
                placeholder="Адрес" 
                value={this.state.adress}
            onChange={this.handleAdressChange}
              />
            </Col>
        </FormGroup>

          <FormGroup 
          value={this.state.gender}
          onChange={this.handleGenderChange}
      >
            <center>
              <Radio name="radioGroup" inline value='Мужчина'>
                Мужчина
              </Radio>
            <Radio name="radioGroup" inline value='Женщина'>
                Женщина
              </Radio>
          </center>
        </FormGroup>
      <Button id="myBtn" action="http://localhost:9000/listUsers" onClick={this.handleSumbit}>Save</Button>
      </Form>   
    </div>
  )
  }
}

export default FormComponent;