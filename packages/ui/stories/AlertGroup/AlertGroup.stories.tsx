import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Alert } from 'patternfly-react';
import { AlertGroup } from '../../src/AlertGroup/AlertGroup';

const stories = storiesOf('Notifications', module);

stories.add('AlertGroup Basic', () => {
  return (
    <AlertGroup>
      {[
        <Alert key={0} type="success">
          <span>
            Well done! You successfully read this important alert message.
          </span>
        </Alert>,
      ]}
    </AlertGroup>
  );
});

let alertList: any[] = [
  {
    type: 'success',
    title: 'Success Alert',
    key: 0,
  },
  {
    type: 'warning',
    title: 'Warning Alert',
    key: 1,
  },
  {
    type: 'error',
    title: 'Error Alert',
    key: 2,
  },
  {
    type: 'info',
    title: 'Info Alert',
    key: 3,
  },
];

const buildAlert = (props: any, idx: number): JSX.Element => {
  return (
    <Alert {...props} key={idx}>
      <span>{props.title}</span>
    </Alert>
  );
};

stories.add('AlertGroup passed an array', () => {
  return (
    <AlertGroup assistiveTechnologyDelay={1000}>
      {alertList.map((props, idx) => buildAlert(props, idx))}
    </AlertGroup>
  );
});

let counter = alertList.length;
const addAlert = () => {
  // console.log({counter});
  const updatedAlertList = alertList.concat([
    { type: 'success', title: 'Added alert', key: counter },
  ]);
  counter += 1;
  // console.log('alertList: ', alertList);
  // console.log('updatedAlertList', updatedAlertList);
  // console.log(updatedAlertList);
  alertList = updatedAlertList;
};

stories.add('AlertGroup additions', () => {
  return (
    <React.Fragment>
      <button type="button" onClick={addAlert}>
        Add alert
      </button>
      <AlertGroup assistiveTechnologyDelay={1000}>
        {alertList.map((props, idx) => buildAlert(props, idx))}
      </AlertGroup>
    </React.Fragment>
  );
});
