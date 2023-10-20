import React, { useState } from 'react';
import Button from '../atomos/Button';
import Input from '../atomos/Input';
import Label from '../atomos/Label';

const Form = () => {
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
    email: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });

    // Realizar validación en tiempo real
    validateField(name, value);
  };

  const validateField = (name, value) => {
    const updatedErrors = { ...errors };

    switch (name) {
      case 'username':
        // Validar el nombre de usuario (puede personalizar esta validación)
        updatedErrors.username = value.length < 5 ? 'El nombre de usuario debe tener al menos 5 caracteres' : '';
        break;
      case 'password':
        // Validar la contraseña (puede usar su expresión regular)
        const passwordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
        updatedErrors.password = passwordValid ? '' : 'La contraseña no cumple con los requisitos.';
        break;
      case 'email':
        // Validar el correo electrónico (puede usar una expresión regular para esto)
        const emailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
        updatedErrors.email = emailValid ? '' : 'El correo electrónico no es válido.';
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Validar los campos antes de enviar el formulario
    const formIsValid = Object.values(errors).every((error) => error === '');

    if (formIsValid) {
      alert('Formulario válido, se puede enviar.');
      console.log('Formulario válido, se puede enviar:', formState);
    } else {
      alert('El formulario contiene errores. Por favor, corrija los campos resaltados.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="username">Usuario:</Label>
        <br />
        <Input
          type="text"
          id="username"
          name="username"
          value={formState.username}
          onChange={handleInputChange}
        />
        {errors.username && <div className="error">{errors.username}</div>}
      </div>
      <div>
        <Label htmlFor="password">Contraseña:</Label>
        <br />
        <Input
          type="password"
          id="password"
          name="password"
          value={formState.password}
          onChange={handleInputChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <Label htmlFor="email">Email:</Label>
        <br />
        <Input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;
