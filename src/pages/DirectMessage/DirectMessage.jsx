import { Textarea , Avatar, AvatarBadge, AvatarGroup , Wrap, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { getChannels, listUsers, retrieveMessage, sendMessage } from '../../services'
import { useState , useEffect } from 'react'
import { ChatUser } from '../../components/ChatUser';
import './styles.css'



export function DirectMessage () {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])
  const [channels, setChannels] = useState([]);
  const [users, setUsers] = useState([]);
  const [chatWith, setChatWith] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [clickedUsers, setClickedUsers] = useState([]);

  const currentUserUid = localStorage.getItem('uid')

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendUserMessage = async () => {
    if (!chatWith || message == '') { return null }

    const response = await sendMessage({ 
      receiver_id: chatWith.id,
      receiver_class: 'User',
      body: message
    })

    await getMessages(chatWith.id)
    setMessage('')
  }

  const getMessages = async (userId) => {
    const response = await retrieveMessage({
      receiver_id: userId,
      receiver_class: 'User'
    })
    response.json()
      .then((data) => {
        console.log('data', data.data)
        setMessages(data.data)
      })
  }


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    searchValue(e.target.value)
  }

  const searchValue = (value) => {
    if (value == '') {
      setSearchResults([])
    } else {
      console.log(clickedUsers)
      const userResults = users.filter((user) => user.uid.includes(value) && user.uid !== currentUserUid && !clickedUsers.includes(user))
      setSearchResults(userResults)
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendUserMessage()
    }
  }

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await listUsers()
      response.json().then(data => {
        setUsers(data.data)
        setSearchResults([])
      })
    }
    getAllUsers()
  }, [])

  const handleUserClick = (user) => {
    if (!clickedUsers.includes(user)) {
      setClickedUsers([...clickedUsers, user])
    }
    const newResults = searchResults.filter((result) => user !== result) 
    setSearchResults(newResults)
  }
  
  return (
    <div className='direct-message-container'>
      <div className='users-container'>
        <div style={{ fontSize: '2rem', textAlign: 'center' }}>Message</div>
        <input className='input-container'
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='&#128269; Search email address...'
        />
        {
          searchResults?.map((user , index) => (
            <ChatUser 
              user={user} 
              key={index} 
              getMessages={getMessages}
              setChatWith={setChatWith} 
              handleUserClick={handleUserClick}/>
          ))
        }
        <div>Recent Messages
        {clickedUsers.map((user,index) =>(
              <ChatUser
                user={user} 
                key={index} 
                getMessages={getMessages}
                setChatWith={setChatWith}  
                handleUserClick={handleUserClick}/>
        ))
        }
        </div>
      </div>
      <div className="messages-container">
        {chatWith?.uid && (
          <ChatUser user={chatWith} clickable={false}/>
        )}
        <div className='messages-wrapper'>
          {
            messages.map((message, index) => (
              <div className={message.sender.uid == currentUserUid ? 'currentUserMessage' : 'receiverMessage'} key={index}>
                {message.body}
              </div>
              
            ))
          }
        </div>
        <div className='send-container'>
          <Textarea placeholder='Chat your friend' onChange={handleMessageChange} onKeyPress={handleKeyPress} value={message}/>
          <button onClick={sendUserMessage}>Send</button>
        </div>
      </div>
      
    </div>
    
  );
}




