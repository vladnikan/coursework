import { FC, useState } from "react";

interface FormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

const Form: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  return (
    <div className="formStyle">
      <input className="emailStyle" 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value) }
        placeholder="email"
      />
      <input className="passwordStyle"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value) }
        placeholder="password"
      />
      <button className="signStyle"
        onClick={() => handleClick(email, pass)}
      >
        {title}
      </button>
    </div>
  );
};

export default Form;
