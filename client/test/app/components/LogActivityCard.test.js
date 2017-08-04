import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import LogActivityCard from './../../../app/components/LogActivityCard';
import Card from "../../../app/Core/Card/Card";
import CardHeader from "../../../app/Core/Card/CardHeader";

describe("<LogActivityCard /> Component", ()=>{
  sinon.spy(LogActivityCard.prototype, 'componentWillMount');
  const Wrapper = mount(<LogActivityCard />);

  it('renders LogActivityCard', ()=>{
    expect(Wrapper.find(Card)).to.have.length(1);
  });

  it('expect CardHeader to be present', ()=>{
    expect(Wrapper.find(CardHeader)).to.have.length(1);
  });

  it('calls componentWillMount()', ()=> {
    expect(LogActivityCard.prototype.componentWillMount.calledOnce).to.equal(true);
  });

  it('has activityList props which is an array', ()=> {
    expect(Wrapper.props().activityList).to.be.an('Array');
  });

  it('expect activityList in the state to be an array and length > 0', ()=>{
    expect(Wrapper.state().activityList).to.be.an('Array');
    expect(Wrapper.state().activityList.length > 0).to.be.true;
    console.log("\nState activityList on rendering::::\n", Wrapper.state().activityList);
  });

  it('should update state on ok-button click', ()=>{
    Wrapper.find('.glyphicon.glyphicon-ok-circle').first().simulate('click');
    expect(Wrapper.state().activityList.length).to.equal(1);
    console.log("\nState activityList After ok button click::::\n", Wrapper.state().activityList);
  });

});