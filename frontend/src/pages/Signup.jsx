import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [firstname, setFirstname]=useState("")
  const [lastname, setLastname]=useState("")
  const [username, setUsername]=useState("")
  const [password, setPassword]=useState("")
  const navigate=useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox onChange={(e)=>{
          setFirstname(e.target.value)
        }} placeholder="first name" label={"First Name"} />
        <InputBox onChange={(e)=>{
          setLastname(e.target.value)
        }} placeholder="last name" label={"Last Name"} />
        <InputBox onChange={(e)=>{
          setUsername(e.target.value)
        }} placeholder="abc@gmail.com" label={"Email"} />
        <InputBox onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
          <Button onClick={async ()=>{
            const response=await axios.post("https://zip-pay-api.vercel.app/api/v1/user/signup",{
              username,password,firstname,lastname
            })
            localStorage.setItem("token", response.data.token)
            navigate('/dashboard')
          }} label={"Sign up"} />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}