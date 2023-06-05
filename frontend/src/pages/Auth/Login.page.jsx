import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from '@mantine/core';

const LoginPage = () => { 
  const navigate = useNavigate();
  const { loginService, user } = useBoundStore((state) => state);
  const [ credentials, setCredentials ] = useState({user:"", pass:""});

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onTextInput = (event) => {
    const userName = event.currentTarget.value
    setCredentials(state => ({
      ...state,
      user: userName
    }));
  }

  const onPasswordInput = (event) => {
    const passWord = event.currentTarget.value
    setCredentials(state => ({
      ...state,
      password: passWord
    }));
  }

  const onLogin = async (e) => {
    e.preventDefault();
    if (!credentials.user || !credentials.password) return;
    loginService(credentials.user, credentials.password);
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput 
          onChange={onTextInput}
          label="Email" 
          placeholder="you@mantine.dev" 
          required />
        <PasswordInput 
          onChange={onPasswordInput} 
          label="Password" 
          placeholder="Your password" 
          mt="md"
          required  />
        <Button fullWidth mt="xl" onClick={onLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default LoginPage;
