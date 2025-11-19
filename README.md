# Gym-Buddy

<div align="center">


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Contributors](https://img.shields.io/github/contributors/Drew-Andersen/Vintage-Vault.svg?style=plastic&logo=appveyor)](https://github/SetCra123/Gym-Buddy/)

</div>

<div align="center">
  <h3 align="center">Gym Buddy</h3>
<br />
Brought to you by
<br />
<a href="https://github.com/SetCra21/Gym-Buddy"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/SetCra21/Gym-Buddy">View Demo(Soon)</a>

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project
This is a project where a user can input information about themselves and their goals and they will get a custom workout (exercise routine) for them. The idea came come from me searching for exercises for myself or my wife; at the same time I was learning how to develop software at my FullStack Bootcamp. 
</br >
</br >
I thought it would be cool to have an app that did all of that for you! Ok, so there are most likely apps out there that do that, but it was cool that I created some version of one. 
</br >
</br >
This project tested my ability to integrate my backend with my front end, my React skills and my error handling. I also got better with state and feel like I have a solid grasp on it!

<!-- BUILT WITH -->
### Built Using:
This project was built using the MERN stack (MongoDB, Express, React, Node). <br />

<div align="center">

[![Javascript](https://img.shields.io/badge/Language-JavaScript-ff0000?style=plastic&logo=JavaScript&logoWidth=10)](https://javascript.info/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-80ff00?style=plastic&logo=MongoDB&logoWidth=10)](https://www.mongodb.com/home)
[![Node.js](https://img.shields.io/badge/Framework-Node.js-ff0000?style=plastic&logo=Node.js&logoWidth=10)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/Framework-React.js-ff8000?style=plastic&logo=React&logoWidth=10)](https://reactjs.org/docs/getting-started.html)
[![Express](https://img.shields.io/badge/Framework-Express-80ff00?style=plastic&logo=Express&logoWidth=10)](https://expressjs.com/)
[![npm](https://img.shields.io/badge/Tools-npm-ff0000?style=plastic&logo=npm&logoWidth=10)](https://www.npmjs.com/)
[![VS Code](https://img.shields.io/badge/IDE-VSCode-ff0000?style=plastic&logo=VisualStudioCode&logoWidth=10)](https://code.visualstudio.com/docs)
[![Bcrypt](https://img.shields.io/badge/Package-Bcrypt-00ffff?style=plastic&logo=npm&logoWidth=10)](https://www.npmjs.com/package/bcrypt)


</div>
<!-- GETTING STARTED -->

## Getting Started

Once completely built, this application will function as a deployed app on Render.

### Local Installation/Testing

1. Clone the rep

```
git clone https://github.com/SetCra21/Gym-Buddy.git
```

2. Install dependencies

```
npm i
```

3. Seed the database

```
npm run seed
```

4. Launch the app in development environment

```
npm run start
``` 


5. Navigate to client folder 

```
cd client
```

6. Launch app on React server

```
npm run dev
```

## Roadmap

<!-- TODO: Plan out rough roadmap here -->
 1. A user is taken to the login/signup page, where they can log in or create an account.

 2. When a user logs in or creates an account, they are taken to a profile update page where they   begin to build a profile by entering their age, height and weight.

 3. Once a user chooses their age, weight and height, they are redirected to a page where they choose a fitness goal.  

 4. Once a user chooses a fitness goal, they are redirected to a page where they choose their fitness level.  

 5. Once a user chooses a fitness level, they are redirected to a home page, where they can see their profile information and a workout routine, consisting of exercises that to match their fitness goal and fitness level. 
 6. Once on the homepage, a user can update their profile for a new curated workout routine. 


#### MVP

 - [x] Front End

  - [x] User Auth
  - [x] User Profile Page
    - [x] Routing
    - [x] Styling
  - [x] Home Page
    - [x] Routing
    - [x] Styling
  - [x] Goals Page
    - [x] Routing
    - [x] Styling
  - [x] Fitness Page
    - [x] Routing
    - [x] Styling
- [x] Back End
  - [x] User Auth
  - [x] Models
  - [x] Seeds
  - [x] api Routing



#### Future Development

- [ ] Function for user to create a custom workout.
- [ ] Function for user to save workouts, once completed and view saved workouts
- [ ] Develop in Social Network 

See the [open issues](https://github.com/SetCra21/Gym-Buddy/issues) for a full list of proposed features (and known issues).