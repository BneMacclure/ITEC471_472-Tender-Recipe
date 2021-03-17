import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Navigator from '../../navigation/Navigator';

describe('<Navigator />', () => {
    it('Navigator snapshot test' , () => {
        const tree = renderer.create(<Navigator />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})