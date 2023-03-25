import React, { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
export default function AddModel({ SelectCard, AddModels, setAddModels, AddBtnFun, AddContact }) {
    const addbtnClose = () => {
        setAddModels(false)

    }
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const Submit = () => {
        setEmail("")
        setName("")
        addbtnClose()
        AddContact(Name, Email)
    }
    // console.log(SelectCard)
    return (
        <>
            <AnimatePresence>
                {

                    (AddModels) &&
                    <BlackLayer
                        // onClick={addbtnClose}
                        // initial={{ y: '200vh', scale: 0 }}
                        // animate={{ y: 0, scale: 1 }}
                        exit={{ y: '200vh', scale: 0 }}
                    >
                        <ModelMain
                            AddModels={AddModels}
                            initial={{ y: '200vh', scale: 0 }}
                            animate={{ y: 0, scale: 1, zIndex: 2 }}
                            exit={{ y: '200vh', scale: 0 }}
                        >
                            {/* <ModelHeader></ModelHeader> */}
                            <ModelBody>
                                <NAmeINput placeholder="Enter Your Email" type='text' value={Name} onChange={(e) => setName(e.target.value)} />
                                <EmailINput placeholder="Enter Your Email" text='email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </ModelBody>
                            <div className="d-flex justify-content-evenly mt-4 pt-4 position-relative top-25">
                                <BUtton className='myclr' onClick={addbtnClose}>close</BUtton>
                                < BUtton onClick={Submit} >Add Contact </BUtton>
                            </div>
                        </ModelMain>
                    </BlackLayer>
                }
            </AnimatePresence>
        </>
    )
}
const NAmeINput = styled.input`
border-radius: 5px;
padding: 17px 10px;
  width: 92%;
  height: 2vh;
  border: 1px solid #7c797b47;
  margin-top: 1rem;
  &::placeholder{
      padding-left: 10px;
      font-size: 0.8rem;
    }
    &:focus{
    border: 1px solid #7c797b47;
    outline: none;
}
`
const EmailINput = styled.input`
    border-radius: 5px;
padding: 17px 10px;
  width: 92%;
  height: 2vh;
  border: 1px solid #7c797b47;
  margin-top: 1rem;
  &::placeholder{
    padding-left: 10px;
    font-size: 0.8rem;
  }
  &:focus{
    border: 1px solid #7c797b47;
    outline: none;
  }
`
const BlackLayer = styled(motion.div)`
    /* z-index: 2; */
    width: 100%;
    height: 100vh;
    background-color: #2929298c;
    transition: all 100ms;
`
const ModelMain = styled(motion.div)`
display: flex;
flex-direction: column;
background-color: #f8f8f8;
width: 30%;
height: 30vh;
position: absolute;
transition: all 100ms;
z-index: 3;
top: 30%;
left: 35%;
display: flex;
justify-content: center;
border-radius: 5px;

padding: 20px 30px;
overflow: hidden;
`
const ModelHeader = styled.div``
const ModelBody = styled.div`
position:absolute;
top: 0;
margin-top: 20px;
z-index: 4;
`
const BUtton = styled.div`
    all: unset;
    position: relative;
    top: 30%;
  background-color: ${props => props.theme.primary};
  padding: 10px 20px;
  color: white;
  width: 35%;
  border-radius: 5px;
  margin-top: 2rem;
  text-align: center;
  font-size: 1rem;
  font-weight:600;
  cursor: pointer;

`