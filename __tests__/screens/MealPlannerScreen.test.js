import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MealPlannerScreen from '../../screens/MealPlannerScreen';

describe('<MealPlannerScreen />', () => {
    it('MealplannerScreen snapshot test' , () => {
        const tree = renderer.create(<MealPlannerScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})