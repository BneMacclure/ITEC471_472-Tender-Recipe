import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../../screens/RegisterScreen';
import Registration02 from '../../screens/Registration02';
import Registration03 from '../../screens/Registration03';
import Registration04 from '../../screens/Registration04';
import Registration05 from '../../screens/Registration05';
import { Alert } from 'react-native';
import Enzyme, { configure, shallow, mount } from 'enzyme';
import {act, fireEvent, waitFor, cleanup, render} from '@testing-library/react-native';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});
describe('<RegisterScreen />', () => {
    it('RegisterScreen snapshot test' , () => {
        const tree = renderer.create(<Registration />).toJSON();
        expect(tree).toMatchSnapshot();
    });
	it('first Registration page renders',()=>{
		const nav=jest.fn();
		const param=jest.fn();
		const { getByText } = render(<Registration navigation={{nav}} route={{param}} />);
		fireEvent.press(getByText('Sign Up'));
		expect(param).toHaveBeenCalledTimes(0);
		//0 because form wont submit with blanks
	});
	
	
	
	
})