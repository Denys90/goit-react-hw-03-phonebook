import React from 'react';
import Input from '../Styled/Input.styled';

type FilterProps = {
  value: string;
  onChange: (value: string) => void;
};
function Filter({ value, onChange }: FilterProps) {
  return (
    <Input
      type="text"
      placeholder="Search contacts"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
    />
  );
}

export default Filter;
