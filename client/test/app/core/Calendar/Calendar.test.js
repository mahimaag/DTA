import React from "react"
import {expect} from "chai"
import {mount,shallow} from 'enzyme'
import Calendar from "../../../../app/Core/Calendar"
import BigCalendar from 'react-big-calendar';

describe('Component : Calendar',() => {
    const Wrapper = mount(<Calendar/>);
    it('should mount Calendar component', () => {
       expect(Wrapper.find('.calendar')).to.have.length(1);
   });
    it('contains BigCalendar', () => {
        expect(Wrapper.find(BigCalendar)).to.have.length(1);
    });
});