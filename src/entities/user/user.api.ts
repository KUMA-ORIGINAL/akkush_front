import axios from 'axios';
import {
  ActivationData,
  CreateUserSchema,
  EditUserProfile,
  LoginUserDto,
  SendEmail,
  TokensDtoSchema,
  UpdatePassword,
  UserDtoSchema,
} from './user.types';
import $api from '~shared/api';

const API = 'https://asiya.tw1.su/api/';

export function getTokenMutation(params: { user: LoginUserDto }) {
  return axios.post<TokensDtoSchema>(`${API}/jwt/create/`, params.user);
}

export function loginUserQuery() {
  return $api.get<UserDtoSchema>('users/me');
}

export function registerUserMutation(params: { user: CreateUserSchema }) {
  return axios.post(`${API}/auth/users/`, params.user);
}

export function emailActivationMutation(params: { data: ActivationData }) {
  return axios.post(`${API}/auth/users/activation/`, params.data);
}

export function editUserProfile(params: { user: EditUserProfile }) {
  return $api.patch('users/me/', params.user);
}

export function getUserByUsername(username: string) {
  return axios.get(`${API}/${username}/`);
}

export function resetPasswordEmail(params: { email: SendEmail }) {
  return axios.post(`${API}/reset_password/`, params.email);
}

export function resetPasswordConfirm(params: { data: UpdatePassword }) {
  return axios.post(`${API}/reset_password_confirm/`, params.data);
}

