import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import RegisterScreen from '../../screens/RegisterScreen';

describe('<RegisterScreen />', () => {
    it('RegisterScreen snapshot test' , () => {
        const tree = renderer.create(<RegisterScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})