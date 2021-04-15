import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import MainScreenInfo from '../../screens/MainScreen';
import { renderRecipes } from '../../screens/MainScreen';
// in a test setup file, or your test itself
const FRAME_TIME = 10

global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME)
}

describe('<MainScreen />', () => {
    it('main screen snapshot', () => {
        const tree = renderer.create(<MainScreenInfo />).toJSON();
        expect(tree).toMatchSnapshot();
    });
	it('main screen snapshot', () => {
		let main = new MainScreenInfo();
		
        expect(main.renderRecipes()).tobenull();
    });
	it('first registertion page renders',()=>{
		const wrapper = render(<MainScreenInfo />);
		expect(wrapper).toBeTruthy();
	});
})