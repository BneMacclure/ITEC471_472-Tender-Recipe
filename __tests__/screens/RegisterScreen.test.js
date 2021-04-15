import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Registration from '../../screens/RegisterScreen';
import Registration02 from '../../screens/Registration02';
import Registration03 from '../../screens/Registration03';
import Registration04 from '../../screens/Registration04';
import Registration05 from '../../screens/Registration05';
import { Alert } from 'react-native';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import {act, fireEvent, waitFor, cleanup, render} from '@testing-library/react-native';

describe('<RegisterScreen />', () => {
    it('RegisterScreen snapshot test' , () => {
        const tree = renderer.create(<Registration />).toJSON();
        expect(tree).toMatchSnapshot();
    });
	it('first registertion page renders',()=>{
		const nav=jest.fn();
		const param=jest.fn();
		const { getByText } = render(<Registration navigation={{nav}} route={{param}} />);
		fireEvent.press(getByText('Sign Up'));
		//expect(nav).toHaveBeenCalledWith('Registration02');
	});
	it('first registertion page renders',()=>{
		const wrapper = shallow(<Button />);
		const firstButton = wrapper.find(‘button’).at(0);
		const secondButton = wrapper.find(‘button’).at(1);
		
	});
	
	
	
	
	
})