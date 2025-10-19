# HoneyDo

A productivity companion that turns your household to-do list into a sweet HoneyDo co-op.
Team up with family, friends, or roommates to create tasks, track progress, and stay organized.

"Honey, did you HoneyDo it?"
"You know I HoneyDid! And now...it's HoneyDone!" har har har

## Table of Contents

[HoneyDo](#honeydo)
[Table of Contents](#table-of-contents)
[Project Description](#project-description)
[Features](#features)
[Installation](#installation)
[Usage](#usage)

## Project Description

HoneyDo helps busy households manage tasks, chores, and errands all in one place.
Managing a shared life with someone can be challenging. The purpose of this app is to
put all of those non-negotiable things that absolutely need to be done in one place so
you can create a happy and responsible life together.

## Features

- Shared team dashboard showing everything that needs to be done within a household
- The ability to create a new household or invite multiple users to an existing household
- Create, update, and complete tasks, errands, and chores
- Secure authentication and persistent storage powered by MongoDB & JWT
- Basic security middleware (helmet, CORS, XSS sanitization, rate limiting)
- A calm, honey-toned theme with readable typography and balance
- A responsive UI designed for desktop, tablet, and mobile devices

Coming soon:

- Sorting and filtering (by creator, category, status, newest)
- Assign tasks to specific users within a household
- Create role-based permissions to authorize only certain users for full CRUD capability
- Ability to create tasks with custom category names
- Add comments and attachments to tasks
- Recurring tasks and schedules
- Calendar integration with daily, weekly, and monthly options

## Installation

1. Clone the repository

2. Install dependencies:
   `npm install`

3. Create a `.env` file in the project root and add the required keys:

   `PORT=3000`
   `MONGO_URI=your_mongodb_connection_string`
   `JWT_SECRET=super_secret_honeydo_key`

   `MONGO_URI`: Grab this from your MongoDB Atlas cluster or local instance
   `JWT_SECRET`: This should be a long, random string, preferably created by a random string generator

4. Launch the development server
   `npm start`

## Usage

1. Sign up or log in to your HoneyDo account
2. Create a new list of tasks, errands, and chores
3. Invite your family, friends, or roommates with your join code
4. Mark tasks complete, edit existing tasks, or create new tasks
