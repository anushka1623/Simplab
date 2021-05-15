import createDataContext from './createDataContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signout':
      return {token: null, email: ''};
    case 'signin':
    case 'restoreToken':
    case 'signup':
      return {
        token: action.payload.token,
        email: action.payload.email,
        username: action.payload.username,
        profile_image: action.payload.profile_image,
        organization: action.payload.organization,
        contact: action.payload.contact,
        teams: action.payload.teams,
      };
    default:
      return state;
  }
};

const restoreToken = dispatch => {
  return async () => {
    dispatch({
      type: 'signin',
      payload: {
        token: await AsyncStorage.getItem('simplab-user-token'),
      },
    });
  };
};

const signup = dispatch => {
  return async ({Username, email, password}) => {
    //console.log('Signup');
    //console.log(email, password);
    await axios
      .post('https://simplab-api.herokuapp.com/api/users/', {
        username: Username,
        password: password,
        email: email,
      })
      .then(function (response) {
        console.log(response.data);
        alert('User registered successfully.');
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
      });
  };
};

const signin = dispatch => {
  return async ({username, password}) => {
    // Do some API Request here
    console.log(username, password);

    await axios
      .get(`https://simplab-api.herokuapp.com/api/auth/${username}/${password}`)
      .then(async res => {
        await AsyncStorage.setItem('simplab-user-token', `${res.data.user}`)
        dispatch({
          type: 'signin',
          payload: {
            token: res.data.user,
            username: res.data.username,
            email: res.data.email,
            profile_image: res.data.profile_image,
            organization: res.data.organization,
            contact: res.data.contact,
            teams: res.data.teams,
          },
        });
      })
      .catch(e => {
        console.log(e);
        alert('Invalid username or password occurred');
        return 0;
      });
  };
};

const signout = dispatch => {
  return () => {
    dispatch({type: 'signout'});
  };
};

export const {Provider, Context} = createDataContext(
  authReducer,
  {signin, signout, signup, restoreToken},
  {token: null, email: ''},
);
