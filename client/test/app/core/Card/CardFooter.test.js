/**
 * Created by sourabh on 10/8/17.
 */
import React from "react"
import {expect} from "chai"
import {mount,shallow} from "enzyme"
import CardFooter from "../../../../app/Core/Card/CardFooter"


describe("Component : CardFooter",()=>{
   const Wrapper=shallow(<CardFooter style={{color:'red'}}/>);
    it('should mount CardFooter component',()=>{
       expect(Wrapper.find('.card-footer')).to.have.length(1)
    });
    it('should have style=color:red',()=>{
       expect(Wrapper.props().style.color).to.equal('red')
    });
});