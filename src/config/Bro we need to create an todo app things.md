Bro we need to create an todo app things we are going to use 

1. react-router-dom (for navigation)
2. antDesign (for UI frameWork)
3. fireBase (for BackEnd)
4. colors #21F1A8, #171717 (and there variant also)
5. use React js for this project

Step 1:
    Bro you need to create and private Routes which check that if the user is login or not if not then send it to the login page (pages create forGotPassword, login,signUP)
    follow the theme colour which i provide you all the things are dynamic 
        1.1:
            pages you need to create 
            1. Home (it will be the main page not protected by private routes)
            2. DastBoard (it will be protected)
            3. add task (it will be protected)
            4. view task (it will bw protected)
        1.2:
            fireBase functions 
            1. create sign in with email function (required)
            2. create signup function with email (required)
            3. also ask the user to give there phoneNumber (required)
            4. also create an button "go with google" (phoneNumber is required) 

step2:
    function to create
    2.1:
        1.Login, logUP/signUP, logOut, deleteAccount, changeEmail, changePhoneNumber, 
    2.2
        1. store every text data to FireStore & other data (img) to Cloudinary

step3:
    save the data to the fireStore
    3.1:
        save user data
        1. save the user data like docRef(db,'Users',`${user.uid}_${user.displayName}`)
        2. save user data phoneNumber, email, password, name, uid
    3.2:
        task data 
        1. save the task dat like docRef(db,'Task', user.uid, TaskID)
        2. save data task title, description, lastComplete date, and task img (store the img to Cloudinary, every data is required)

step4:
    check every function is working or not 
    4.1:
    check every function is working if not then fix it 
    4.2:
    make the website responsive to different devices 