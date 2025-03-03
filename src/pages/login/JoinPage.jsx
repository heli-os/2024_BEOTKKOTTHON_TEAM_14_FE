import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Screen = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.3rem;

  background-color: #000;
`;

const Backbtn = styled.div`
  width: 100%;
  height: 3.125rem;
  padding-left: 1rem;
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Title = styled.div`
  width: 100%;
  height: 4rem;

  display: flex;
  align-items: center;
  padding-left: 2.6rem;

  color: #fff;
  text-align: center;
  font-family: Inter;
  font-size: 2.1875rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.13125rem;
`;

const InputItem = styled.div`
  width: 100%;
  padding-left: 2.6rem;
  color: #fff;
  font-family: Inter;
  font-size: 1.44213rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.0865rem;
`;

const InputForm = styled.input`
  width: 18.76744rem;
  padding-bottom: 0.5rem;

  border-bottom: 0.894px solid #fff;
  background: none;

  color: #fff;
  font-family: Inter;
  font-size: 1.00538rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  letter-spacing: -0.06031rem;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #fff;
  }
`;

const Button = styled.div`
  width: 7.0625rem;
  height: 2.75rem;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 3.125rem;
  border: 1px solid #fff;

  color: #fff;
  text-align: center;
  font-family: Roboto;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const JoinPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const isEmailValid = email.includes('@');
  const isFormValid =
    username.trim() !== '' &&
    email.trim() !== '' &&
    password.trim() !== '' &&
    phonenumber.trim() !== '';

  const handleJoin = async () => {
    const formData = {
      email: email,
      phoneNumber: phonenumber,
      name: username,
      password: password,
    };

    try {
      const response = await axios.post(`/api/auth/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
          formData,
        },
      });

      if (response.data.code === 201) {
        console.log(response.data.message);
        navigate('/start');
      }
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const goBack = () => {
    navigate('/start');
  };

  return (
    <Screen>
      <Backbtn onClick={goBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="15"
          viewBox="0 0 10 15"
          fill="none"
        >
          <path
            d="M10 1.11727L9.04902 0L0 7.5L1.14885 8.45391L9.04902 15L10 13.8827L2.2977 7.5L10 1.11727Z"
            fill="white"
          />
        </svg>
      </Backbtn>

      <Title>Sign Up</Title>
      <p />

      <InputItem>Username</InputItem>
      <InputForm
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="이름을 입력해주세요."
      />
      <p />

      <InputItem>Email</InputItem>
      <InputForm
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="plandeath@goorm.com"
      />
      <p />

      <InputItem>Password</InputItem>
      <InputForm
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="특수문자와 함께 5자 이상 입력해주세요."
        type="password"
      />
      <p />

      <InputItem>Phone number</InputItem>
      <InputForm
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        placeholder="010-0000-0000"
      />
      <p />

      <Button onClick={handleJoin} disabled={!isEmailValid || !isFormValid}>
        가입 완료
      </Button>
    </Screen>
  );
};

export default JoinPage;
