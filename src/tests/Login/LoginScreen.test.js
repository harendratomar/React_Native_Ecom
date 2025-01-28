// src/tests/LoginScreen.test.js
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../components/LoginScreen';

test('renders LoginScreen correctly', () => {
  const { getByPlaceholderText, getByText } = render(<LoginScreen navigation={{ navigate: jest.fn() }} />);
  
  const emailInput = getByPlaceholderText('Email');
  const passwordInput = getByPlaceholderText('Password');
  const loginButton = getByText('Login');

  fireEvent.changeText(emailInput, 'test@example.com');
  fireEvent.changeText(passwordInput, 'password123');
  fireEvent.press(loginButton);

  expect(emailInput.props.value).toBe('test@example.com');
  expect(passwordInput.props.value).toBe('password123');
});
