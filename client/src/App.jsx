import React from 'react'
import { useState } from 'react'
import Component from './components/Component';
import './App.css'


function App() {
  const [signIn, toggle] = React.useState(true);
  return(
    <Component.Container>
      <Component.SignUpContainer signinIn={signIn}>
        <Component.Form>
          <Component.Title>Create Title</Component.Title>
          <Component.Input type='text' placeholder='Name' />
          <Component.Input type='email' placeholder='Email' />
          <Component.Input type='password' placeholder='Password' />
          <Component.Button>Sign Up</Component.Button>
        </Component.Form>
      </Component.SignUpContainer>

      <Component.SignInContainer signinIn={signIn}>
        <Component.Form>
          <Component.Title>Sign In</Component.Title>
          <Component.Input type='email' placeholder='Email' />
          <Component.Input type='password' placeholder='Password' />
          <Component.Anchor href='#'>Forgot Password</Component.Anchor>
          <Component.Button>Sign In</Component.Button>
        </Component.Form>
      </Component.SignInContainer>
        

      <Component.OverlayContainer signinIn={signIn}>
       <Component.Overlay signinIn={signIn}>
       <Component.LeftOverlayPanel signinIn={signIn}>
       
        <Component.Title>
          Welcome Back!
        </Component.Title>
        <Component.Paragraph>
          To see your next workout, please login using your user credentials!
        </Component.Paragraph>
        <Component.GhostButton onClick={()=>toggle(true)}>
          Sign In
        </Component.GhostButton>
       </Component.LeftOverlayPanel>
        
       <Component.RightOverlayPanel signinIn={signIn}>
        <Component.Title>
          Get ready to sweat!
        </Component.Title>
        <Component.Paragraph>
          Enter your details and begin your fitness journey.
        </Component.Paragraph>
          <Component.GhostButton onClick={()=>toggle(false)}>
            Sign Up!
          </Component.GhostButton>
       </Component.RightOverlayPanel>
      
      
       </Component.Overlay>  
        
      </Component.OverlayContainer> 

      
      
      
      





    </Component.Container>
  )
}

export default App
