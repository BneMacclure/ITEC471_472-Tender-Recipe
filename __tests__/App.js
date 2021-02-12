import 'react-native';
import React from 'react';
import App from '../App';
import LoginScreen from '../screens/LoginScreen';
import CreateRecipeScreen from '../screens/CreateRecipeScreen';
import MainScreenInfo from '../screens/MainScreen';
import Profile from '../screens/MyProfile';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


test('App snapshot', () => {
  const tree = renderer.create(<Profile />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('login page snapshot', () => {
  const tree = renderer.create(<LoginScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('create recipe Screen ', () => {
  const tree = renderer.create(<CreateRecipeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
test('main screen snapshot', () => {
  const tree = renderer.create(<MainScreenInfo />).toJSON();
  expect(tree).toMatchSnapshot();
});


