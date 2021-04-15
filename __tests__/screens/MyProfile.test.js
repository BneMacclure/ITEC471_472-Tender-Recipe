import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../screens/MyProfile';

import { Alert } from 'react-native';
import {act, fireEvent, waitFor, cleanup, render} from '@testing-library/react-native';
describe('<MyProfile />', () => {
    it('MyProfile snapshot test' , () => {
        const tree = renderer.create(<Profile />).toJSON();
        expect(tree).toMatchSnapshot();
    })
	it("renders correctly", () => {
		render(<Profile />);
	});
	it('first registertion page renders',()=>{
		const wrapper = render(<Profile />);
		expect(wrapper).toBeTruthy();
	});
})