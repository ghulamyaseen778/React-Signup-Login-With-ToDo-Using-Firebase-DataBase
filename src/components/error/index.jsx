import React from 'react'
import Form from 'react-bootstrap/Form';
import './err.css'

const Error = (props) => {
  return (
    <Form.Text className="co">
          {props.text}
        </Form.Text>
  )
}

export default Error