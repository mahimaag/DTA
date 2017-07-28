const assert = require('assert');
import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Sample from '../app/components/Sample/index';

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('<Sample />', () => {
  it('renders Sample Component', () => {
    const wrapper = mount(<Sample />);
    expect(wrapper.contains(<div className="unique">Hello World!</div>)).to.equal(true);
  });
});