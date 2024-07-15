import { TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';


export const TextFieldWrapper = (props: any) => {
    const [innerValue, setInnerValue] = useState('');

    useEffect(() => {
        if (props.value) {
            setInnerValue(props.value as string);
        } else {
            setInnerValue('');
        }
    }, [props.value]);

    const debouncedHandleOnChange = useDebouncedCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            if (props.onChange) {
                props.onChange(event);
            }
        },
        400
    );

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.persist();
        const newValue = event.currentTarget.value;
        setInnerValue(newValue);
        debouncedHandleOnChange(event);
    }, []);

    return (
        <TextField
            {...props}
            value={innerValue}
            onChange={handleOnChange}
        />
    );
};