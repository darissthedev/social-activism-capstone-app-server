# Social Activism Capstone (done)
Social Activism App with reliable and accurate information from your trusted social organizations, verified content updated daily. 



### 1. Working Prototype (done)
You can access a working prototype of the React app here: https://wokeapp-k7nkbvzbq.vercel.app/ and Node app here: https://social-activism-capstone-app.herokuapp.com/



### 2. User Stories (done)
This app is for two types of users: a visitor and a logged-in user (verified)

###### Landing Page (Importance - High)
As a visitor
* I want to understand what I can do with this app (or sign up, or log in)
* so I can decide if I want to use it

###### Login Page (Importance - High)
As a returning registered user
* I want to enter my password and username to use this app,
* So I can have access to my account.

###### Sign Up (Importance - High)
As a visitor
* I want to register to use this app
* So I can create a personal account.

###### Create Page (Importance - High)
As a logged-in user,
* I want to be able to create and edit, verfied content,
* So I can share important information on social  activities on the app.

###### Dashboard Page (Importance - High)
As a logged-in user,
* I want to be able to update and delete content posts on the app,
* So I can decide what activities are most relevant.

###### Explore Feed Page (Importance - Medium)
As a logged-in user,
* I want to be able to preview the content of the app,
* So I can decide what section I want to navigate to.



### 3. Functionality (done)
The app's functionality includes:
* Users/Visitors can click on 'Register' button to sign up/ sign in
* Users/Visitors can click on 'Learn More' to move to a detail page
* Users/Visitors can see a bullet list of features that the app provides
* Users can view verified content (users can be organization or view content)
* Users can browse a limited list of the most recent posts
* Users can create a post (to be verified) to share
* Users can delete a post they've created
* Users can edit/update a post they've created







### 4. Technology (done)
* Front-End: HTML5, CSS3, JavaScript ES6, React
* Back-End: Node.js, Express.js, Mocha, Chai, RESTful API Endpoints, Postgres
* Development Environment: Heroku, DBeaver



### 5. Wireframes (done)
Landing Page
:-------------------------:
![Landing Page](/github-images/wireframes/landing-page-wireframe.png)
Sign Up Page
![Sign Up Page](/github-images/wireframes/sign-up-page-wireframe.png)
Log In Page
![Log In Page](/github-images/wireframes/log-in-page-wireframe.png)
About Us Page
![About Us Page](/github-images/wireframes/about-page-wireframe.png)
Dashboard Page
![Dashboard Page](/github-images/wireframes/dashboard-page-wireframe.png)
Create Post Page
![Create Post Page](/github-images/wireframes/create-post-page-wireframe.png)
Exaplore Feed Page
![Explore Feed Page](/github-images/wireframes/explore-feed-page-wireframe.png)



### 6. Front-end Structure - React Components Map (done)
* __Index.js__ (stateless)
    * __App.js__ (stateful)
        * __LandingPage.js__ (stateless) - leads to 'about us' and 'sing up/ log in' components (front-end)
            * __LogIn.js__ (stateful) - interacts with users table (back-end) to validate users
            * __SignUp.js__ (stateful) - interacts with user table (to post new user info) (back-end)
        * __AboutUs.js__ (stateless) - leads to 'sign up' and 'log in' components (front-end)
        * __Dashboard.js__ (stateless) - displays list of posts (front-end)
            * __TopNav.js__ (stateless) - routes to components
        * __ExploreFeed.js__ (stateless) - displays user posts (front-end)
        * __CreatePost.js__ (stateful) - interacts with posts table (to post new user posts) (back-end)



### 7. Back-end Structure - Business Objects (done)
* Users (database table)
    * id (auto-generated)
    * fullname var char 255 (at least 3 chars)
    * email var char 255 (email validation)
    * password var char 255 (at least 8 chars, at least one alpha and a special character validation)
    * accountType var char 255 (select 1 from dropdown: 'personal', 'organization')
    * organizationName var char 255 (optional)

* Posts (database table)
    * id (auto-generated)
    * user_id (foreign key to users table)
    * event_title var char 255 ()
    * event_description TEXT ()
    * event_type var char 255 (choose from dropdown menu: 'sit in', 'silent protest', 'walk out', 'rally', etc.)
    * event_datetime TIMESTAMPTZ (timestamp for when event takes place)
    * event_location TEXT (address of event)

* Comments (database table)
    * id (auto-generated)
    * posts_id (foreign key from posts table)
    * content TEXT ()
    * datetime TIMESTAMPTZ ()

<!-- next steps
     -->

### 8. API Documentation (to do later)
API Documentation details:
* (Example) get all users



### 9. Screenshots (to do later)
(Example) Landing Page
:-------------------------:
![Landing Page](/github-images/screenshots/landing-page-screenshot.png)
Register Page
![Register Page](/github-images/screenshots/register-page-screenshot.png)



### 10. Development Roadmap (to do later)
This is v1.0 of the app, but future enhancements are expected to include:
* (Example) add more functionality



### 11. How to run it (done)
Use command line to navigate into the project folder and run the following in terminal

##### Local React scripts
* To install the react project ===> npm install
* To run react (on port 3000) ===> npm start
* To run tests ===> npm run test

##### Local Node scripts
* To install the node project ===> npm install
* To migrate the database ===> npm run migrate -- 1
* To run Node server (on port 8000) ===> npm run dev
* To run tests ===> npm run test
