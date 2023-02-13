import React from 'react';
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons';

export default function AdminPost( props ){
  return(
    <div className='post'>
      <Avatar className='post--avatar' size='large' title={props.name} icon={<UserOutlined />}/>
      <div className='post--infor'>{props.name}</div>
      <div className='post--number'>{props.number}</div>
    </div>
  )
}