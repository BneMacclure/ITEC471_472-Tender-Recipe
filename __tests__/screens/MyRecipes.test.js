import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MyRecipes from '../../screens/MyRecipes';

describe('<MyRecipes />', () => {
    
    it('MyRecipes snapshot test' , () => {;
        const tree = renderer.create(<MyRecipes />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})