import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MealPlannerScreen from '../../screens/MealPlannerScreen';
import { Alert } from 'react-native';
import {act, fireEvent, waitFor, cleanup, render} from '@testing-library/react-native';

describe('<MealPlannerScreen />', () => {
    it('MealplannerScreen snapshot test' , () => {
        const tree = renderer.create(<MealPlannerScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
	it('first registertion page renders',()=>{
		const wrapper = render(<MealPlannerScreen />);
		expect(wrapper).toBeTruthy();
	});
	
})