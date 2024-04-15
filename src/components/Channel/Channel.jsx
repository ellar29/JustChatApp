import React from 'react'

export function Channel({channel, onClickChannel}) {
  const handleClickChannel = () => {
    // custom logic
    onClickChannel(channel)
  }
  return (
    <div onClick={handleClickChannel}>{channel.name}</div>
  )
}
