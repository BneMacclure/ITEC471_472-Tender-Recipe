import 'react-native';
import React, { Component , useState}  from 'react';
import renderer from 'react-test-renderer';
import LoginScreen from '../../screens/LoginScreen';
import { Alert } from 'react-native';
import {act, fireEvent, waitFor, cleanup} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
jest.mock('../../screens/LoginScreen');
import Enzyme, { configure, shallow, mount, render } from 'enzyme';

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

	it('first LoginScreen page renders',()=>{
		const wrapper = render(<LoginScreen />);
		
		let log =  new LoginScreen();
		log.debugLoginFunc;
		expect(LoginScreen).toHaveBeenCalledTimes(2);
		
	});
	
	it("should update state on click", () => {
		window.alert = jest.fn();
		changeinput=jest.fn();
		const wrapper = mount(<LoginScreen onChange={changeinput} />);
		jest.spyOn(Wrapper.instance(), loginFunc);
		wrapper.find("loginButton").simulate("click");
		expect(formWrapper.instance().loginFunc).toBeCalled();
		expect(window.alert).toBeCalledWith(loginFunc);
	});
	
	
})

