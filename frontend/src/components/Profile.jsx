

import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthUser } from '../store/authSlice';

const API_URL = import.meta.env.VITE_API_URL;

const Profile = () => {
    const dispatch = useDispatch()
    const token = useSelector((state) => state.auth.user?.token);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        photo: '',
    });
    const [preview, setPreview] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/v1/users/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setFormData({
                    username: res.data.user.username,
                    email: res.data.user.email,
                    password: '',
                    photo: res.data.user.photo,
                });
                setPreview(res.data.user.photo);
            } catch (error) {
                if (
                    error.response &&
                    (error.response.data.message === 'Token expired' || error.response.status === 401)
                ) {
                    toast.error('Session expired. Please login again.');
                    navigate('/login');
                } else {
                    toast.error('Something went wrong');
                }
            }
        };

        fetchProfile();
    }, [token, navigate]);

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'your_upload_preset'); // must match Cloudinary
    try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dbezsaic9/image/upload', data);
        const imageUrl = res.data.secure_url;

        setFormData((prev) => ({ ...prev, photo: imageUrl }));
        setPreview(imageUrl); // update preview instantly
        setLoading(false);
    } catch (error) {
        toast.error("Image upload failed");
        setLoading(false);
    }
};



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.put(`${API_URL}/api/v1/users/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            toast.success('Profile updated!');
            dispatch(setAuthUser(res.data))
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center px-4 py-8">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Edit Profile</h2>

                <div className="flex justify-center mb-6 relative">
                    <img
                        src={preview || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-4 border-green-400"
                    />
                    <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 p-2 rounded-full cursor-pointer">
                        <Camera className="text-white w-4 h-4" />
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            placeholder="••••••••"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg text-white font-semibold transition ${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
                        }`}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
