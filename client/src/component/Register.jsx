import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { Link } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleNameChange = (e) => {
        console.log(name);
        setName(e.target.value)
    }

    const handlePasswordchange = (e) => {
        setPassword(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('http://localhost:8000/api/v1/user/register', { name, email, password });
            toast.success('User registered successfully.')
            setName('');
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate("/login")
            }, 1000)
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'An unexpected error occurred';
            setError(errorMessage);
            toast.error('Error registering user. Please try again.')
        }
    }
    return (
        <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mx-4 sm:mx-6 md:mx-8 lg:mx-0 cursor-pointer">
            <h5 className="text-xl font-bold mb-6 text-center text-gray-800">Register here</h5>
                <form onSubmit={handleSubmit}>
                    <Toaster position="top-right" />
                    <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-semibold text-sm text-gray-700">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
                        <input
                            type="text"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                           className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordchange}
                          className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300">
                        Register
                    </button>
                    <Link to="/login">
                        <button
                            className="mt-4 text-sm w-full text-blue-700 hover:text-blue-700 underline  ">
                            Already registered? Login
                        </button>
                    </Link>
                </form>
                {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
            </div>
        </div>

    )
}