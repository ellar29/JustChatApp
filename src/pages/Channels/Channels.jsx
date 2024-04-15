import React from 'react'
import { useState , useEffect } from 'react'
import { getChannels } from '../../services'
import { Channel } from '../../components/Channel';
import './styles.css'
import { sendMessage, retrieveMessage } from '../../services';
import { Textarea } from '@chakra-ui/react';
import { CreateChannelModal } from '../../components/CreateChannelModal/CreateChannelModal';


export function Channels() {
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [recentDms, setRecentDms] = useState([]);
  const currentUserUid = localStorage.getItem('uid');

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendChannelMessage()
    }
  }
  
  const getAllChannels = async () => {
    const response = await getChannels()
    response.json().then(data => {
      setChannels(data.data)
    })
  }

  const onClickChannel = async (channel) => {
    setChannel(channel)

    await getChannelMessages(channel)
  }

  const getChannelMessages = async (channel) => {
    const response = await retrieveMessage({
      receiver_id: channel.id,
      receiver_class: 'Channel'
    })
    const data = await response.json()

    setMessages(data.data)
  }

  const sendChannelMessage = async () => {
    if (!channel || message == '') { return null }

    const response = await sendMessage({ 
      receiver_id: channel.id,
      receiver_class: 'Channel',
      body: message
    })

    await getChannelMessages(channel)
    setMessage('')
  }

  // const getRecentDms = async () => {
  //   const response = await fetchRecentDms()
  //   response.json().then(data => {
  //     setRecentDms(data.data)
  //   })
  // }  
  
  useEffect(() => {
    getAllChannels();
    // getRecentDms()
  }, [])

  return (
    <div className="channels-page-container">
      <div className='channels-container'>
        <div className='channel-header'>
        <span>Channels</span>
        <CreateChannelModal getAllChannels={getAllChannels} />
        
        </div>
        {channels.map(channel => (
          <Channel key={channel.id} channel={channel} onClickChannel={onClickChannel} />
        ))}
      </div>
      <div className="messages-container">
        {channel && (
          <div>
            {channel.name}
          </div>
        )}
        <div className="messages-wrapper">
          { messages.length > 0 &&
            messages.map((message, index) => (
              <div className={message.sender.uid == currentUserUid ? 'currentUserMessage' : 'receiverMessage'} key={index}>
                {message.body}
              </div>
            ))
          }
        </div>
        {
          channel && (
            <div className='send-container'>
              <Textarea placeholder='Chat your friend' onChange={handleMessageChange} onKeyPress={handleKeyPress} value={message}/>
              <button onClick={sendChannelMessage}>Send</button>
            </div>
          )
        }
        
      </div>
    </div>
    
  )
}


