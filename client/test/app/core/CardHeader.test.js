/**
 * Created by sourabh on 11/8/17.
 */
import React from "react"
import {expect} from "chai"
import {mount,shallow} from "enzyme"
import CardHeader from "../../../app/Core/Card/CardHeader"

describe('Component : CardHeader',()=>{

    const Wrapper = mount(<CardHeader style={{color:'red'}}>hello world</CardHeader>);
    it('should mount CardHeader component',()=>{
        expect(Wrapper.find('.card-header')).to.have.length(1)
    });
    it('should have style=color:red',()=>{
       expect(Wrapper.props().style.color).to.equal('red')
    });
    it('should have children=hello world',()=>{
       expect(Wrapper.props().children).to.equal('hello world')
    });
});