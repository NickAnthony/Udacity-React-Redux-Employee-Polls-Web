# Employee Polls Project

The `_DATA.js` file represents a fake database and methods that let you access
the data. The only thing you need to edit in the ` _DATA.js` file is the value
of `avatarURL`. Each user should have an avatar, so you’ll need to add the path
to each user’s avatar.

Using the provided starter code, you'll build a React/Redux front end for the
application. We recommend using the [Create React
App](https://github.com/facebook/create-react-app) to bootstrap the project.

## TODO

1. Please remove all code related to saving data in the localStorage, and don't
   save anything outside of Redux's state, we are required not to save data in
   this project, and it ix expected to reset the app to the initial state after
   refreshing the page.
2. There should be a way for the user to impersonate/ log in as an existing
   user. (This could be as simple as having a login box that appears at the root
   of the application. The user could then select a name from the list of
   existing users.)
3. Whenever the user types something in the address bar, the user is asked to
   log in before the requested page is shown.

4. Please order polls by date, newest first. The polls in both categories are
   arranged from the most recently created (top) to the least recently created
   (bottom).
5. The application asks the user to sign in and shows a 404 page if that poll
   does not exist

## Data

There are two three of objects stored in our database:

- Users
- Questions
- AuthedUser

### Users

Users include:

| Attribute | Type   | Description                                                                                                                                                                                                    |
| --------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The user’s unique identifier                                                                                                                                                                                   |
| password  | String | The user’s password in order to log in the application                                                                                                                                                         |
| name      | String | The user’s first name and last name                                                                                                                                                                            |
| avatarURL | String | The path to the image file                                                                                                                                                                                     |
| questions | Array  | A list of ids of the polling questions this user created                                                                                                                                                       |
| answers   | Object | The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options. |

### Questions

Questions include:

| Attribute | Type   | Description                            |
| --------- | ------ | -------------------------------------- |
| id        | String | The question’s unique identifier       |
| author    | String | The author’s unique identifier         |
| timestamp | String | The time when the question was created |
| optionOne | Object | The first voting option                |
| optionTwo | Object | The second voting option               |

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type   | Description                                                        |
| --------- | ------ | ------------------------------------------------------------------ |
| votes     | Array  | A list that contains the id of each user who voted for that option |
| text      | String | The text of the option                                             |

The talks to the database via 4 methods:

- `_getUsers()`
- `_getQuestions()`
- `_saveQuestion(question)`
- `_saveQuestionAnswer(object)`

1. `_getUsers()` Method

_Description_: Get all of the existing users from the database.  
_Return Value_: Object where the key is the user’s id and the value is the user object.

2. `_getQuestions()` Method

_Description_: Get all of the existing questions from the database.  
_Return Value_: Object where the key is the question’s id and the value is the question object.

3. `_saveQuestion(question)` Method

_Description_: Save the polling question in the database. If one of the parameters are missing, an error is thrown.
_Parameters_: Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute     | Type   | Description                                |
| ------------- | ------ | ------------------------------------------ |
| author        | String | The id of the user who posted the question |
| optionOneText | String | The text of the first option               |
| optionTwoText | String | The text of the second option              |

_Return Value_: An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type   | Description                                                                                                                  |
| --------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| id        | String | The id of the question that was posted                                                                                       |
| author    | String | The id of the user who posted the question                                                                                   |
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option |
| timestamp | String | The time when the question was created                                                                                       |

4. `_saveQuestionAnswer(object)` Method

_Description_: Save the answer to a particular polling question in the database. If one of the parameters are missing, an error is thrown.

_Parameters_: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute  | Type   | Description                                                                             |
| ---------- | ------ | --------------------------------------------------------------------------------------- |
| authedUser | String | The id of the user who answered the question                                            |
| qid        | String | The id of the question that was answered                                                |
| answer     | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"` |

## Components

There are many components, here is how each page breaks down.

`App`

- `Nav`
- `Dashboard`
  - `QuestionsTabLayout`
    - `QuestionLayout`
      - `QuestionCard`
- `CreateQuestion`
- `Leaderboard`
- `Question`
  - `VoteOption`
  - `AnsweredOption`
  - `UserAnswer`
  - `ErrorPage`
- `Login`
- `UserProfile`
  - `QuestionLayout`
    - `QuestionCard`
- `CreateUser`

#### `index.js`

Base Index file that Provides the store and the BrowserRouter

#### `App`

Core app. This sets up the routing and loading in initial data from the
database.

The App will redirect to the login page first if there is not authenticated
user.

#### `Nav`

This is the navigation bar. It is hidden from the login screen or create profile
screen, because the user has no need for them there!

#### `Dashboard`

Home page that all questions, divided into answered and unanswered depending on
the authenticated user.

Uses two `QuestionLayout`s to display each set of questions.

#### `QuestionsTabLayout`

Represents a tabbed layout of questions. You can pass a list of tabs and the
questions to show per tab. It will dynamically update and show the right
questions per tab.

#### `QuestionLayout`

Lays out each question in a `QuestionCard`.

#### `QuestionCard`

Card that displays simple info about the question. It contains a link to the
question itself.

#### `CreateQuestion`

Form that lets you create a question. Simple!

#### `Leaderboard`

Shows the user leaderboard! It sorts users first by how many questions they've
answered and then by how many questions they've asked.

#### `Question`

This is the most dynamic component.

It pulls the question id from the URL params. If the question id does not exist,
it will show a 404 `ErrorPage`.

Then it grabs the info of the question. If the authed user has not answered the
question, then it will show two `VoteOptions`.

If the authed user has answered the question, it will show two
`AnsweredOption`s.

#### `VoteOption`

Displays an unanswered vote option. When clicked, will add the users answers to
the state.

#### `AnsweredOption`

Dislays an answered option for a question. It shows the percentage of votes for
this option.

#### `ErrorPage`

Simple 404 error message page.

#### `Login`

This is the core login page. The login page links out to the create new profile
page.

Additionally, when you load a route and there is no authenticated user, the
`App` will redirect to the login page. However, the `Login` component users the
React Router location param to redirect back to the previous route once
authentication is successful.

#### `UserProfile`

Displays a users profile information:

- Name
- Username
- Password
- AvatarURL
- Questions they asked

You can enable editing of the user profile information for the following pieces
of state:

- Name
- Password
- AvatarURL

#### `CreateUser`

Let's you create a new user! It will auto-check that your password is at least 6
characters and your username is not yet taken by an existing user.

### `PasswordInput`

This is a presentational component for a password entry. It lets set your
password visibility as you type.

## Testing

Tests can be run with `npm test`. There are helper functions in the
`test-utils.js` file that help generate the necessary boilerplate so we can test
the logic of the redux store and the react router.

## Store and Local Storage

The store can be found in `store.js`. The initial store is loaded from the
browser's local storage. Then each change is written into the local storage as
well. This let's use persist data across refreshes of the page.

We only store the `authedUser`, `questions`, and `users` to local storage
because we do not want to store old instances of the loading logic or dispatch.
We just want to store the data itself.

Note that on the first render, App.js will load nothing from the local storage
and load everything from the database. On the second render, it will load from
the local storage and reload with data from the database. Because our database
resets on reload, it's unclear what behavior we really want here because we do
want updates to the database to be reflected if we change the initial
`_DATA.js`.
