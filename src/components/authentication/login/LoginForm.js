import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import axios from 'axios';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: 'hello'
      // remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);
      // ,
      // "proxy": "https://pacific-dusk-26535.herokuapp.com"
      axios
        .post(
          'https://pacific-dusk-26535.herokuapp.com/signin',
          // 'http://localhost:3002/signin',
          // {
          //   body: values, // body data type must match "Content-Type" header
          //   // mode: 'no-cors', // no-cors, *cors, same-origin
          //   credentials: 'same-origin', // include, *same-origin, omit
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // }
          values
        )
        .then((res) => {
          if (!res.loginError) {
            localStorage.setItem('session_id', res.data.ret_session_id);
            localStorage.setItem('user', JSON.stringify(res.data.user_info));
            console.log(res.data);
            if (res.data.user_info.roles <= 10) {
              console.log('Error, Unauthorized Access');
              alert('Error, Unauthorized Access');
            } else if (res.data.user_info.roles >= 70) {
              navigate('/dashboard/all-events');
            } else {
              navigate('/dashboard/events');
            }
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      return null;
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
