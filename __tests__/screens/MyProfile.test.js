import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../screens/MyProfile';

describe('<MyProfile />', () => {
    it('MyProfile snapshot test' , () => {
        const tree = renderer.create(<Profile />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})