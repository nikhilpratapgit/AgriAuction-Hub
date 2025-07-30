import React, { useState } from 'react';
import axios from 'axios';
import loginImage from '../assets/login.webp';
import toast from 'react-hot-toast';
import LoginWithGoogle from '../components/LoginWithGoogle';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../store/authSlice';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/v1/users/login`, formData);
      toast.success(t("login.success"));
      dispatch(setAuthUser(res.data));
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      const msg = err.response?.data?.message || t("login.failed");
      toast.error(msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
        <img src={loginImage} alt="Agriculture Login" className="w-full h-full object-cover" />
      </div>

      {/* Right Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
            {t("login.heading")}
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-1">{t("login.email")}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("login.emailPlaceholder")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">{t("login.password")}</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t("login.passwordPlaceholder")}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {loading ? t("login.loading") : t("login.button")}
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            {t("login.noAccount")}{" "}
            <a href="/register" className="text-green-600 underline">
              {t("login.register")}
            </a>
          </p>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">{t("login.or")}</p>
            <LoginWithGoogle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import loginImage from '../assets/login.webp';
// import toast from 'react-hot-toast'
// import LoginWithGoogle from '../components/LoginWithGoogle';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setAuthUser } from '../store/authSlice';
// const API_URL = import.meta.env.VITE_API_URL;

// const Login = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API_URL}/api/v1/users/login`, formData);
//       toast.success("Login Successfully")
//       dispatch(setAuthUser(res.data))
//       navigate('/')
//     } catch (err) {
//       console.error('Login error:', err);
//       toast.error(err)
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Image Section */}
//       <div className="hidden md:flex w-1/2 bg-green-100 items-center justify-center">
//         <img src={loginImage} alt="Agriculture Login" className="w-full h-full object-cover" />
//       </div>

//       {/* Right Login Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
//         <div className="w-full max-w-md">
//           <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Login to AgriAuction Hub</h2>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="Enter your password"
//                 className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//                 required
//               />
//             </div>

//             {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//             >
//               {loading ? 'Logging in...' : 'Login'}
//             </button>
//           </form>

//           <p className="mt-4 text-sm text-center text-gray-600">
//             Don't have an account? <a href="/register" className="text-green-600 underline">Register here</a>
//           </p>
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-500 mb-2">or</p>
//             <LoginWithGoogle />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
