import React from 'react'
import { useField } from 'formik'
import { Form, Label } from 'semantic-ui-react';
import DatePicker, {ReactDatePickerProps } from 'react-datepicker';



// TODO: replace react-datepicker with react-nice-dates
// https://github.com/hernansartorio/react-nice-dates

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    return (
        // !! casts object to a bool
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}