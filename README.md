# API Sing me a Song
## About this Project
Sing me a song is an API for recommending anonymous songs.
The more people like a recommendation, the more likely it is to be recommended to others

## Database
In your psql terminal
```
$ CREATE DATABASE singmeasong
```
Access the database
```
$ \c singmeasong
```
Now, just run the commands listed in <a href="https://github.com/angelicacavalheiro/SingMeASong_API/blob/main/dump.sql">dump.sql</a>

## Functionalities

#### Post a recommendation
On the route https://singmeasong-driven.herokuapp.com/recommendations </br>
You need to send a body like this: </br>
```
{
    "name": "Whitney Houston - I Wanna Dance With Somebod",
    "youtubeLink": "https://www.youtube.com/watch?v=eH3giaIzONA&list=RDeMR_IgXNs7E&index=10&ab_channel=whitneyhoustonVEVO"
}
```

#### Post a upvote on a recommendation
On the route https://singmeasong-driven.herokuapp.com/recommendations/:id/upvote </br>
Replace :id with a valid id </br>

#### Post a downvote on a recommendation
On the route https://singmeasong-driven.herokuapp.com/recommendations/:id/downvote </br>
Replace :id with a valid id </br>

#### Get random recommendation
On the route https://singmeasong-driven.herokuapp.com/recommendations/random  </br>
You will get an object like this </br>
```
{
  "id": 2,
  "name": "Journey - Don't Stop Believin'",
  "youtubeLink": "https://www.youtube.com/watch?v=eMR_IgXNs7E&list=RDeMR_IgXNs7E&start_radio=1&ab_channel=journeyVEVO",
  "score": 11
}
```

#### Get a specific number of top recommendations
On the route https://singmeasong-driven.herokuapp.com/recommendations/top/:amount </br>
Replace :amount with a valid amout </br>
For example, with the route https://singmeasong-driven.herokuapp.com/recommendations/top/2 </br>
You will receive </br>
```
[
  {
    "id": 1,
    "name": "Falamansa - Xote dos Milagres",
    "youtubeLink": "https://www.youtube.com/watch?v=ZTDStzSs2Wo&ab_channel=Fl%C3%A1viaSantana",
    "score": 13
  },
  {
    "id": 2,
    "name": "Journey - Don't Stop Believin'",
    "youtubeLink": "https://www.youtube.com/watch?v=eMR_IgXNs7E&list=RDeMR_IgXNs7E&start_radio=1&ab_channel=journeyVEVO",
    "score": 11
  }
]
```

## Installing
**Cloning the Repository**
```
$ git clone https://github.com/angelicacavalheiro/SingMeASong_API
$ cd SingMeASong_API
```
**Installing dependencies**
```
$ npm install
```
**Run the application in production mode**
```
$ ntl -> start
```
**Run the application in development mode**
Create a .env.dev file and fill it using your environment variables following the .env.example
You can find the .env.example [here](https://github.com/angelicacavalheiro/SingMeASong_API/blob/main/.env.example).
```
$ ntl -> start:dev
```

## Built With
**Server**  ([NodeJS](https://nodejs.org/en/))
-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[NTL](https://github.com/ruyadorno/ntl)**
-   **[Pg](https://github.com/brianc/node-postgres)**
-   **[DotENV](https://github.com/motdotla/dotenv)**
-   **[Joi](https://github.com/hapijs/joi)**
-   **[Husky](https://github.com/typicode/husky)**
-   **[Jest](https://github.com/facebook/jest)**
-   **[Eslint - Airbnb](https://github.com/airbnb/javascript)**

##
## How to contribute
1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`
##
## Author
Developed by Angélica Cavalheiro Rodrigues.
