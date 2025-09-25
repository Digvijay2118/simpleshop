import React from 'react';


export default function FormInput({ label, value, onChange, name, required=false }) {
return (
<label className="form-row">
<span>{label}{required ? ' *' : ''}</span>
<input name={name} value={value} onChange={onChange} />
</label>
);
}