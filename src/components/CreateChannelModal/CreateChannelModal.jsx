import { useDisclosure } from "@chakra-ui/react";
import { useRef, useState , useEffect } from "react";
import { Button, Modal, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, ModalContent, ModalFooter, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import React from 'react'
import Select from 'react-select';
import { listUsers, createChannelWithMembers } from "../../services";


export function CreateChannelModal({getAllChannels}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null)
  const [options, setOptions ] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = useRef(null)
  const [channelName, setChannelName] = useState('');
  const toast = useToast()

  const currentUserUid = localStorage.getItem('uid')

  const onSave = async () =>{
    const newChannelData = {
      name:channelName,
      user_ids: [
        ...selectedOption.map((option) =>(option.value)),
        currentUserId
      ]
    }
    const response = await createChannelWithMembers(newChannelData)

    const data = await response.json()

    if (data.errors) {
      showToast(data.errors.join(', '), 'error')
    } else {
      showToast('Created a Channel', 'success')
      onClose()
      getAllChannels()
    }
    
  }


  useEffect(() => {
    const getAllUsers = async () => {
      const response = await listUsers()
      response.json().then(data => {
        const userId = data.data.filter((user) => (user.uid == currentUserUid))[0].id
        setCurrentUserId(userId)

        const optionsData = data.data.filter((user) => (user.uid !== currentUserUid)).map((user) => {
          return {value: user.id, label: user.uid}
        })
        setOptions(optionsData)
      })
    }
    getAllUsers()
  }, [])

  
  function showToast(message, status) {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <>
      <Button onClick={onOpen}>Create Channel</Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>

            <FormControl mt={4}>
              <FormLabel>Channel name</FormLabel>
              <Input 
              placeholder='Channel name'
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
               />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Channel Members</FormLabel>
              <Select 
                 isMulti
                 value={selectedOption}
                 onChange={setSelectedOption}
                 options={options}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onSave} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}