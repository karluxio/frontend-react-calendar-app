import { useForm } from '../../hooks';
import './login.css';

const loginFormsFields = {
  loginEmail: '',
  loginPassword: ''
}

const registerFormsFields = {
  registerName: '',
  registerEmail: '',
  registerPassword: '',
  registerPassword2: ''
}

export const LoginPage = () => {

  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
    onResetForm: onLoginResetForm
  } = useForm(loginFormsFields)

  const {
    registerName,
    registerEmail,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
    onResetForm: onRegisterResetForm
  } = useForm(registerFormsFields)

  const loginSubmit = (event) => {
    event.preventDefault()
    console.log({ loginEmail, loginPassword });
    onLoginResetForm()
  }

  const registerSubmit = (event) => {
    event.preventDefault()
    console.log({ registerEmail, registerPassword, registerPassword2, registerName });
    onRegisterResetForm()
  }

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Sign In</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                name='loginEmail'
                value={loginEmail}
                onChange={onLoginInputChange}
                placeholder="Email"
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name='loginPassword'
                onChange={onLoginInputChange}
                value={loginPassword}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Login"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name='registerName'
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name='registerEmail'
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name='registerPassword'
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
                name='registerPassword2'
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create an account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}