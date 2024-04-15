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

import { createUser } from '../../services'


export function CreateUser() {
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
      passwordConfirmation: '',
    }

  })

    

  const onSubmit = async (data) => {
    console.log('onsubmit')
    createUser(data)
      .then(response => {
        if (response.status === 200) {
          showToast('User created successfully', 'success');
        } else if (response.status === 422) {
          showToast('Cannot create user', 'error');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        showToast('There was an error', 'error');
      });
  };

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
        <h1 style={{ padding: '20px' }}>Create User</h1>
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
        <FormControl>
        <FormLabel>Password Confirmation</FormLabel>
        <InputGroup size='md'>
          <Input
            pr='4.5rem'
            type={show ? 'text' : 'password'}
            placeholder='Enter password confirmation'
            {...register("passwordConfirmation", {
              required: { value: true, message: 'Password Confirmation is required' },
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
      </form>
    </div>
  )
}

