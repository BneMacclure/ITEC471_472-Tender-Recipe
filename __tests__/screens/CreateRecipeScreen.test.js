import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CreateRecipeScreen from '../../screens/CreateRecipeScreen';


describe('<CreateRecipeScreen />', () => {
    it('CreateRecipeScreen snapshot test' , () => {
        const tree = renderer.create(<CreateRecipeScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})