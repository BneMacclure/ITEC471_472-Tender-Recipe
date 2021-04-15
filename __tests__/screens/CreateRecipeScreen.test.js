import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CreateRecipeScreen from '../../screens/CreateRecipeScreen';
import { Alert } from 'react-native';
import {act, fireEvent, waitFor, cleanup, render} from '@testing-library/react-native';

describe('<CreateRecipeScreen />', () => {
    it('CreateRecipeScreen snapshot test' , () => {
        const tree = renderer.create(<CreateRecipeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
	it('CreateRecipeScreen page renders',()=>{
		const wrapper = render(<CreateRecipeScreen />);
		expect(wrapper).toBeTruthy();
	});
})