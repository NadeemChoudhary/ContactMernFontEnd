import mian from '../public/assets/mian.png'
import styled from 'styled-components'
import Contacts from './Components/Cards'
import AddModel from './Components/AddModel'
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import UpdateModel from './Components/UpdateModel';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { GetUsers } from './Functions/Cardsfun';
import { flushSync } from 'react-dom';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { baseUrl } from '../Base';

function App() {
  const [AddModels, setAddModels] = useState(false);
  const [EditModal, setEditModal] = useState(false);
  const [SearcBar, setSearcBar] = useState('');
  const [Cardid, setCardid] = useState();
  const AddBtnFun = (id) => {
    setAddModels(!AddModels)

    setCardid(id);
    console.log(Cardid)
  }
  const UpdateMOdel = (id) => {

    setEditModal(!EditModal)
    setCardid(id);
    console.log(Cardid)
  }
  const [Cards, setCards] = useState([
    // { id: "1", Name: "NAdeem", Email: 'nadeem@gmail.com' },
    // { id: "", Name: "Aman", Email: 'Aman@gmail.com' },
    // { id: "3", Name: "Garv", Email: 'Garv@gmail.com' },
    // { id: "4", Name: "Nandita", Email: 'Nandita@gmail.com' },
    // { id: "5", Name: "Shalini", Email: 'SFhalini@gmail.com' },
  ])

  // const AddContact = (Name, Email) => {
  //   if (Cards.findIndex((data) => data.Email === Email) === -1 && Email !== '') { // condition for not duplicacy
  //     setCards([...Cards, { Name, Email, id: uuidv4() }])
  //     window.localStorage.setItem("Card", JSON.stringify(Cards))
  //   }
  //   setAddModels(false)
  //   console.log('add')
  // }
  // let SelectCard = Cards.find((data) => data.id === Cardid)
  // console.log(SelectCard)

  // fetch

  const { refetch } = useQuery("Users", GetUsers, {
    enabled: true,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      flushSync(() => {
        setCards(data)
      })
      console.log(Cards)
    }
  })


  //  Add Contact
  const AddContact = async (Name, Email) => {
    console.log(Name, Email)
    await axios.post(`${baseUrl}/users/create`, {
      name: Name,
      email: Email
    }).then((res) => {
      console.log(res, 'add contact')
    })
  }



  // Update Contacts
  const UpdateContact = async (Name, Email, id) => {
    console.log(Name, Email, Cardid, 'check');
    await axios.patch(`${baseUrl}/users/update/${Cardid}`, {
      name: Name,
      email: Email
    }).then((res) => {
      console.log(res, "updated");
      refetch()
    })

    // for update we have to remove that card by using filter method
    // setCards((prev) => 
    //   [
    //     ...Cards.filter((data) => data.id !== id), { Name, Email, id }
    //   ]
    // )

    // console.log(Cards)
    // console.log('updated')
  }
  // delete


  const Delete = async(id) =>{
      await axios.delete(`${baseUrl}/users/del/${id}`)
  }
  
  // setCards([...Cards.filter((data) => data.id !== id)]);



  useEffect(() => {
    // Delete()
    // window.localStorage.removeItem("Card")
  }, [Cards])

  return (
    <>
      <AddModel AddModels={AddModels} setAddModels={setAddModels} AddBtnFun={AddBtnFun} AddContact={AddContact} />
      <UpdateModel EditModal={EditModal} setEditModal={setEditModal} UpdateMOdel={UpdateMOdel} UpdateContact={UpdateContact} />

      <Main>
        <SetFlex>
          <MainIcon src={mian} />
        </SetFlex>
        <Flex justify={'space-between'} alignItems='center'>
          <Addbtn onClick={AddBtnFun}>
            + Add Contact
          </Addbtn>
          <Addbtn onClick={() => refetch()}>
            Refresh
          </Addbtn>
        </Flex>
        <Search placeholder="Search..." onChange={(e) => setSearcBar(e.target.value)} />
        <SetoverFlow>
          {
            Cards.filter((data) => {
              if (data.name.toLowerCase().includes(SearcBar.toLowerCase())) {
                return data
              }
            }).map((res) => {
              return <Contacts res={res} key={res.id} UpdateMOdel={UpdateMOdel} Delete={Delete} />
            })
          }

        </SetoverFlow>

      </Main>
    </>
  )
}

export default App
const SetoverFlow = styled.div`
 height: 50vh;
 margin-top: 17px;
  overflow: scroll;
`
const Main = styled.div`
z-index: -1;
  width: 30%;
 position: absolute;
 top: 5vh;
 left: 35%; 
 height: 90vh;
overflow: hidden;
 box-shadow: 1px 1px 10px grey;
 padding: 10px 20px;
 border-radius: 5px;
`
const MainIcon = styled.img`
  width: 80%;
`
const SetFlex = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  align-items: center;
`
const Addbtn = styled.button`
  all: unset;
  background-color: ${props => props.theme.primary};
  padding: 5px 20px;
  color: white;
  border-radius: 5px;
  margin-top: 1.3rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight:600;
  
  `
const Search = styled.input`
border-radius: 5px;
padding: 17px 10px;
  width: 100%;
  height: 2vh;
  border: 1px solid #7c797b90;
  margin-top: 1rem;
  &::placeholder{
    padding-left: 10px;
    font-size: 0.7rem;
    
  }
`