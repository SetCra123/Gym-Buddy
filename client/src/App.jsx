import React from 'react'
import { useState } from 'react'
import Component from './components/Component';
import './App.css'


function App() {
  const signIn = React.useState(true);
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
    </Component.Container>
  )
}

export default App
