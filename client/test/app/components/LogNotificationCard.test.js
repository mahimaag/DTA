import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import LogNotificationCard from './../../../app/components/LogNotificationCard';
import Card from "../../../app/Core/Card/Card";
import CardContent from "../../../app/Core/Card/CardContent";
import CardHeader from "../../../app/Core/Card/CardHeader";

describe('<LogNotificationCard /> Component', () => {
  const wrapper = shallow(<LogNotificationCard />);
  it('renders Card', () => {
    expect(wrapper.find(Card)).to.have.length(1);
    expect(wrapper.find(CardContent)).to.have.length(1);
  });
  it('contains Card header', () => {
    expect(wrapper.find(CardHeader)).to.have.length(1);
  });
  it('contains Card content', () => {
    expect(wrapper.find(CardHeader)).to.have.length(1);
  });
});