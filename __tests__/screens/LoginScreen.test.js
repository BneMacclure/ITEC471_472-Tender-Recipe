import 'react-native';
import React, { Component , useState}  from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../screens/LoginScreen';
import { Alert } from 'react-native';
import {act, fireEvent, waitFor, cleanup,render} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
jest.mock('../../screens/LoginScreen');


beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  LoginScreen.mockClear();

});
describe('<LoginScreen />', () => {
    it('LoginScreen snapshot test' , () => {
        const tree = renderer.create(<LoginScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
	it('first LoginScreen page renders',()=>{
		const wrapper = render(<LoginScreen />);
		expect(wrapper).toBeTruthy();
	});

	it('debugloginFunc called',()=>{
		const wrapper = render(<LoginScreen />);
		
		let log =  new LoginScreen();
		log.debugLoginFunc;
		expect(LoginScreen).toHaveBeenCalledTimes(2);
		
	});
	it('loginFunc called',()=>{
		const wrapper = render(<LoginScreen />);
		
		let log =  new LoginScreen();
		log.email="jamal@test.edu";
		log.pass="pass";
		log.loginFunc;
		expect(LoginScreen).toHaveBeenCalledTimes(2);
		
	});
	
	
})

