/**
 * Created by sourabh on 10/8/17.
 */
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Card from './../../../app/Core/Card';

describe('Component: Card',()=>{
    const Wrapper=mount(<Card style={{color:"red"}}>hello world</Card>);
    it("should mount card component",()=>{
        expect(Wrapper.find('.card')).to.have.length(1);
    });
    it('should have style=color:red',()=>{
        expect(Wrapper.props().style.color).to.equal('red')
    });
    it('should have children=hello world',()=>{
        expect(Wrapper.props().children).to.equal('hello world')
    });

});


