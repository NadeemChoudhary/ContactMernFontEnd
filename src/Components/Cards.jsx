import React from 'react'
import styled from 'styled-components'
import { FaUserAlt, FaEdit, FaRemoveFormat } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { baseUrl } from '../../Base'
import { useQuery } from 'react-query'
import axios from 'axios'
function Contacts({ Delete, res, UpdateMOdel }) {
    const DeleteHandler = (id) => {
        Delete(id)
    }
// console.log(res , 'api data')

    return (
        <Cards>
            <Icon className='col-2'><FaUserAlt /> </Icon>
            <TextData className='col-7 ms-3'>
                <NAme>{res.name}</NAme>
                <Emails>{res.email}</Emails>
            </TextData>
            <Actions>
                <FaEdit className='me-2' onClick={() => UpdateMOdel(res._id)} />
                <AiFillDelete onClick={() => DeleteHandler(res._id)} />
            </Actions>
        </Cards>
    )
}

export default Contacts
const Actions = styled.div`
font-size: 1.7rem ;
color: white;
display: flex;
align-items: center;
justify-content: space-between;
cursor: pointer;
`
const Emails = styled.div`
text-align: start;
width: 100%;

`
const NAme = styled.div`
text-align: start;
width: 100%;
`
const TextData = styled.div`
  display: flex;
  color: white;
  font-weight: 500;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`
const Icon = styled.div`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`
const Cards = styled.div`
display: flex;
align-items: center;
    width: 100%;
    background-color: ${props => props.theme.primary};
    height: 10vh;
    border-radius: 5px;
    margin-top: 1rem;
`
