import { useForm } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import React from 'react'

import { loginUser } from '../../services'
import { useNavigate } from 'react-router-dom'


export function Login() {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const toast = useToast();

  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }

  })
    

  const onSubmit = async (data) => {
    console.log('onsubmit')
    loginUser(data)
      .then(response => {
        if (response.status === 200) {
          showToast('Signed in successfully', 'success');
          saveCredentials(response);
          navigate('/dashboard');
        } else if (response.status === 422) {
          showToast('Please check your email address and password and try again.', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('There was an error', 'error');
      });
  };

  const saveCredentials = (response) => {
    localStorage.setItem('token', response.headers.get('access-token'))
    localStorage.setItem('client', response.headers.get('client'))
    localStorage.setItem('expiry', response.headers.get('expiry'))
    localStorage.setItem('uid', response.headers.get('uid'))
  }

  const onClickCreateAccount = () => {
    navigate('/sign_up');
  }

  function showToast(message, status) {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  }
  
  return (
    <div> 
      <form style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100vh'}}onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ padding: '20px' }}>Log In</h1>
        <FormControl isInvalid={errors.email}>
          <FormLabel>Email address</FormLabel>
          <Input 
            type='email' 
            placeholder='Enter email address'
            {...register("email", {
              required: { value: true, message: 'Email is required' },
            }
            )} 
          />
          {errors.email && (
            <FormErrorMessage>{errors.email.message}</FormErrorMessage>
          )}
        </FormControl>
        <FormErrorMessage>Email is required</FormErrorMessage>
        <FormControl>
        <FormLabel>Password</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password'
            {...register("password", {
              required: { value: true, message: 'Password is required' },
            })}
          />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme='blue' style={{ padding: '10px' , marginTop: '20px' }} >Submit</Button>
         <div>
      </div>
      <div>
        <button type='button' onClick={onClickCreateAccount}>Don't have an account? Create a JustChatApp Account</button>
      </div>
      </form> 
    </div>
  )
}

