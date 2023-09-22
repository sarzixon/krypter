import * as React from "react";
import { useController, Control, RegisterOptions } from "react-hook-form";
import { TextField } from "@mui/material";

export type FormItem<T> = Omit<T, "checked" | "name" | "onChange" | "value">;

export interface IReactHookFormFieldProps {
    name: string;
    control: Control;
    rules?: RegisterOptions;
    error: boolean|undefined;
}

export type IFormFieldProps<C> = IReactHookFormFieldProps & FormItem<C>;

export type ITextFieldInputProps = IFormFieldProps<{
    type: React.InputHTMLAttributes<unknown>['type'],
    variant: "outlined" | "standard" | "filled",
    label: string
    // children: React.ReactNode
}>;

export const TextFieldInput: React.FunctionComponent<ITextFieldInputProps> = ({
                                                                      name,
                                                                      control,
                                                                      rules,
                                                                      type,
                                                                      label,
                                                                      variant,
                                                                      error,
                                                                      ...restProps
                                                                  }: ITextFieldInputProps) => {
    const {
        field: { onChange, value },
    } = useController({
        name,
        control,
        rules,
    });

    return (

            <TextField

                variant={variant as any}
                type={type as any}
                onChange={(event) => onChange(event)}
                name={name}
                value={value}
                label={label}
                error={error}
                {...restProps}
            />
    );
};

export default TextFieldInput;
