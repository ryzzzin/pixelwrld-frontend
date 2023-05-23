import React from 'react';
import s from './Input.module.scss';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  value?: string;
  setValue?: (value: string) => void;
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { value, setValue, ...attrs } = props;

  return (
    <input {...attrs}
      className={[s.input, attrs.className].join(' ')}
      value={value}
      onChange={(e) => setValue ? setValue(e.target.value) : {}}
    />
  );
};

export default Input;