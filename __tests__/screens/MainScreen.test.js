import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MainScreenInfo from '../../screens/MainScreen';

describe('<MainScreen />', () => {
    it('main screen snapshot', () => {
        const tree = renderer.create(<MainScreenInfo />).toJSON();
        expect(tree).toMatchSnapshot();
    });
})