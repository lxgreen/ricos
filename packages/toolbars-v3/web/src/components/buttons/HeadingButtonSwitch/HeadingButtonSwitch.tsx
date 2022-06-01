import React from 'react';
import { withToolbarContext } from '../../../utils/withContext';
import CustomHeadingButton from '../CustomHeadingButton/CustomHeadingButton';
import HeadingButton from '../HeadingButton/HeadingButton';

const HeadingButtonSwitch = ({ toolbarItem, context }) => {
  const { headingsData } = context || {};
  if (!context) return null;

  return headingsData?.allowHeadingCustomization ? (
    <CustomHeadingButton toolbarItem={toolbarItem} />
  ) : (
    <HeadingButton toolbarItem={toolbarItem} />
  );
};

export default withToolbarContext(HeadingButtonSwitch);
