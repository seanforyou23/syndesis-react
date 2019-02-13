import * as React from 'react';
import { render } from 'react-testing-library';
import { FormTextAreaComponent } from '../src/widgets/FormTextAreaComponent';

export default describe('FormTextAreaComponent', () => {
  const formTextAreaComponent = (
    <FormTextAreaComponent
      form={{ isSubmitting: false }}
      field={{
        name: 'test01TextArea',
        value: '',
      }}
      property={{
        displayName: 'Test Control Label',
        description: 'Test Description',
      }}
    />
  );

  it('Should use the definition key as an id for checkbox', () => {
    const { getByTestId } = render(formTextAreaComponent);
    const idValue = formTextAreaComponent.props.field.name;
    expect(getByTestId(idValue)).toBeDefined();
  });

  it('Should use the displayName as a label in checkbox', () => {
    const { getByLabelText } = render(formTextAreaComponent);
    const displayName = formTextAreaComponent.props.property.displayName;
    expect(getByLabelText(displayName)).toBeTruthy();
  });
});
