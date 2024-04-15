
import { createChannelWithMembers } from "../../services"
import { useDisclosure, useToast , Avatar, Wrap, WrapItem } from "@chakra-ui/react"
import "./styles.css"
import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

export const ChatUser = ({user, getMessages = null, setChatWith = null, clickable = true, handleUserClick = null}) => {
  const toast = useToast()
  const handleClick = async () => {
    if (!clickable) { return }


    await getMessages(user.id)
    setChatWith(user)
    handleUserClick(user)
    showToast(`Chatting with ${user.uid}`, 'success')
  }

  function getEmailInitials(uid) {
    const [firstPart] = uid.split('@');
    return firstPart.charAt(0).toUpperCase();
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
    <div onClick={handleClick} className="chat-user">
      <div className='avatar-group'>
          <Wrap>
            <WrapItem>
              <Avatar name={getEmailInitials(user.uid)} />
            </WrapItem>
          </Wrap>
        </div>
      <span>{user.id}</span>
      <div>{user.uid}</div>
    </div>
  )
}