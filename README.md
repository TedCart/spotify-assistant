# Song List Maker

Front-end Repo: https://github.com/TedCart/spotify-assistant
Back-end repo: https://github.com/TedCart/spotify-assistant-back-end

Deployed Front-end: https://tedcart.github.io/spotify-assistant/
Deployed Back-end: https://spotify-assistant-itunes.herokuapp.com/

## Technologies Used

-JavaScript
-HTML + CSS
-jQuery
-Handlebars
-Bootstrap

## What does it do?

Currently, this app lets a user create and save a list of songs. The user can also edit a song's title or artist after creating it. The user can also delete songs from the list.

The list is saved on an API and protected so that other users cannot view each other's song lists.

## Plans for the future

The wireframes below show a concept that this projects has not yet acheived. Hopefully I will be able to incorporate Spotify user authentication and parse song information from a user's iTunes library so that the user can add those songs to their Spotify library and stream them through that service.

## Planning Stages

Initially, I was unsure I'd even have a traditional login. If a user could verify their spotify credentials, that might have been enough somehow. My primary focus was parsing a user's iTunes library and creating a "smart search" to hit Spotify's API. Results could be added directly (at the user's disgression) to their Spotify library.

I found a [github repo by shawnbot](https://github.com/shawnbot/itunes-data) that show great potential in parsing an xml file and getting the iTues data. I planned to restructure some of that code to better access some more appropriate subset of the large iTunes collection users may have.

From there, I'd create a table/list of songs (likely from user's already created playlists) including those search buttons described above.

That was the plan!

## My Process

I focused heavily on getting authentication from spotify, however the task proved too difficult for the short time alotted to the project.

I felt that certain important decisions hinged on how that authentication process worked, such as which back-end API framework I should use (express or Rails?). As such, I replaced my back end more than once trying to get a successfull response from Spotify's servers. To make matters worse (or better, depending on your point of view) I made a successful curl request to the Spotify API and received an access token. This reinvigorated my focus on the issue, figuring I must be close to streamlining that request.

After a few days, I relented and created a more basic project in keeping with the minimum requirements for the project. I created resources on the back-end to host a list of songs.

## User-Stories

-A user can verify the app's permission to modify their Spotify Library.
-A user can upload their iTunes playlist information and use the resulting interface to selectively add equivalent songs to their Spotify library

These stories have yet to come true.

## Wireframes

![Wireframe](spotify-assistant-wireframe.jpg)
