# UdaciCards

This is my solution for the final assessment project for Udacity's React Native course where I build a flashcards app. Users can create decks, add questions to decks and exercise by taking a quiz. 

# Start Application

To start the app, simply install and run using npm.

* `npm install`
* `npm start`

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

# Platforms

During development, the app was mainly tested on an Apple iPhone SE. However it was also tested on Samsung Galaxy J3 running Android.

# Features

## List of decks
The list of decks displays all available decks with their title and the number of questions that were added. This is also the home view which is shown when starting the application.

## Create new deck
The app includes a form to add a new deck. To do that, the title of the new deck needs to be added. Duplicates are not possible. If a title which was entered which was already set for another deck, no new deck will be added and a dialog will be shown informing the user about it. When the submit button is clicked and a new deck was successfully added, the user is taken to the details view for the deck.

## Deck details
When chosing a deck from the list of decks, a deck details view is opened. This view displays the title of the deck and the number of questions that were added. There also are two buttons, one for adding a new question and one for starting the quiz for this deck.

## Add question
When clicking the button for adding a new question on the deck details view, a form will be opened where the user can enter a question and an answer. Both need to be set for the submit button to become enabled. When the submit button is clicked and a new question is added to the deck, the user is taken back to the deck details view.

## Quiz
When clicking the start quiz button, the quiz view is opened. The quiz view can only be opened if at least one question was added to the deck. When opening the quiz view, it displays the first question of the deck as a card. The card can be flipped by tapping the card. The card will then reveal the answer. The user can then compare the answer he tought of to the actual answer and mark the question as answered correct or wrong by tapping one of the buttons displayed below the card. When a question is marked as correct or wrong, the next card is displayed until the last card of the deck is reached. When the last card of the deck is 'answered', the result of the quiz is displayed. This shows the amount of questions that were answered correctly in relation to the total amount of questions.

## Notifications
Notifications have been set up so the user is shown a notification each day reminding him of completing a quiz unless he has not entered the Quiz view on the day.

# Background Information

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).