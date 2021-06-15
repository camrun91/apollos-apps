import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import moment from 'moment';
import { RadioButton, withTheme } from '@apollosproject/ui-kit';

import {
  ProfileEntryFieldContainer,
  LegalText,
  FieldLabel,
  RadioInput,
  RadioLabel,
  DatePicker,
} from '../styles';

const ProfileDetailsEntry = (props) => (
  <ProfileEntryFieldContainer {...props}>
    <FieldLabel padded>Gender</FieldLabel>
    <RadioInput
      label="Gender"
      type="radio"
      value={get(props.values, 'gender')}
      error={get(props.touched, 'gender') && get(props.errors, 'gender')}
      onChange={(value) => props.setFieldValue('gender', value)}
    >
      {props.genderList.map((gender) => [
        <RadioButton
          key={gender.field || gender}
          value={gender.field || gender}
          label={() => <RadioLabel>{gender.label || gender}</RadioLabel>}
          underline={false}
        />,
      ])}
    </RadioInput>
    <FieldLabel>Birthday</FieldLabel>
    <DatePicker
      type={'DateInput'}
      placeholder={'Select a date...'}
      value={props.values?.birthDate}
      error={get(props.touched, 'birthDate') && get(props.errors, 'birthDate')}
      displayValue={
        // only show a birthday if we have one.
        get(props.values, 'birthDate', '') // DatePicker shows displayValue > placeholder > label in that order
          ? moment(props.values.birthDate).format('MM/DD/YYYY')
          : '' // Pass an empty string if we don't have a birthday to show the placeholder.
      }
      onChange={(value) => props.setFieldValue('birthDate', value)}
    />
  </ProfileEntryFieldContainer>
);

ProfileDetailsEntry.propTypes = {
  title: PropTypes.node,
  prompt: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.shape({
    phone: PropTypes.string,
    birthDate: PropTypes.string,
  }),
  touched: PropTypes.shape({
    gender: PropTypes.bool,
    birthDate: PropTypes.bool,
  }),
  isLoading: PropTypes.bool,
  onPressNext: PropTypes.func, // used to navigate and/or submit the form
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.shape({
    phone: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
  }),
  genderList: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        field: PropTypes.string,
        label: PropTypes.string,
      }),
    ])
  ),
  defaultDate: PropTypes.instanceOf(Date),
};

ProfileDetailsEntry.defaultProps = {
  title: "This one's easy.",
  prompt:
    'Help us understand who you are so we can connect you with the best ministries and events.',
  genderList: [
    'Male',
    'Female',
    { label: 'Prefer not to reply', field: 'Unknown' },
  ],
};

ProfileDetailsEntry.LegalText = LegalText;

ProfileDetailsEntry.displayName = 'ProfileDetailsEntry';

export default withTheme(
  () => ({}),
  'ui-auth.ProfileDetailsEntry'
)(ProfileDetailsEntry);
