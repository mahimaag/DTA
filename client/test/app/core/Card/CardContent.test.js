/**
 * Created by sourabh on 10/8/17.
 */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import  CardContent from "../../../../app/Core/Card/CardContent"

describe('Component :CardContent',()=>{
    const Wrapper=mount(<CardContent style={{color:'red'}}>hello world</CardContent>);
    it('should mount CardContent component',()=>{
        expect(Wrapper.find('.card-content.clearfix')).to.have.length(1)
    });

    it('should have style=color:red',()=>{
       expect(Wrapper.props().style.color).to.equal('red')
    });

    it('should have children=hello world',()=>{
        expect(Wrapper.props().children).to.equal('hello world')
    })

});