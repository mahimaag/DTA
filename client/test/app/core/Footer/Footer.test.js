/**
 * Created by sourabh on 16/8/17.
 */
import React from "react"
import {expect} from "chai"
import {mount,shallow} from 'enzyme'
import Footer from "../../../../app/Core/Footer"

describe('Component : Footer',() => {
   const Wrapper = shallow(<Footer/>);
   it('should mount Footer component', () => {
       expect(Wrapper.find('.footer')).to.have.length(1);
   });
});


