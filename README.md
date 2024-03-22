# Chat Application

This is a simple ReactJS application integrated with Firebase, designed for managing to-do lists and user authentication. Users can sign up securely, log in, and create, edit, or delete their to-do items. The application provides a straightforward interface for organizing tasks effectively. Firebase ensures real-time synchronization of data, making collaboration seamless. Additionally, the application includes filtering functionality based on the status of each to-do item, allowing users to filter by 'completed' or 'not completed' tasks.

## Client

### Steps

1. Clone the repository

```shell
git clone https://github.com/catomas/Todos-Firebase.git
```

2. Rename the `.env.template` file to `.env` and fill in the required fields

```shell
mv .env.template .env
```

3. Install the dependencies

```shell
yarn install
```

4. Start the server

```shell
yarn start
```

5. Open the browser and navigate to `http://localhost:3000` or the URL displayed in the terminal

### Considerations

- Make sure all of the environment variables are set up correctly in the `.env` file. You need to create a Firebase project and set up the required configuration variables. visit [Firebase](https://firebase.google.com/) for more information.

## Application URL

- [Chat Application](https://todos-firebase-gamma.vercel.app/)
