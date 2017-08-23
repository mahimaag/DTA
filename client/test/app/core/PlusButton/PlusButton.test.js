/**
 * Created by sourabh on 11/8/17.
 */
import React from "react"
import {expect} from "chai"
import {mount,shallow} from 'enzyme'
import AddButton from "../../../../app/Core/PlusButton"
import ModalContent from "../../../../app/Core/AddActivityModalContent"
describe('Component : PlusButton',()=>{
    const Wrapper = mount(<AddButton/>);
    it('should mount PlusButton component',()=>{
        expect(Wrapper.find(".modal-container")).to.have.length(1);

    });
    it('should have a button',()=>{
        expect(Wrapper.find('button')).to.have.length(1)
    });
    it('should update state on + button click',()=>{
        Wrapper.find('button').simulate('click');
        const show=Wrapper.state().show;
        expect(show).to.equal(true);
    });
    xit('should open modal',()=>{
        expect(Wrapper.find(ModalContent)).to.have.length(1)
    });

});