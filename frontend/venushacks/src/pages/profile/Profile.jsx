import { useState, useEffect } from 'react'
import axios from "axios";
import './Profile.css'
import astronaut from '../../assets/Astronaut.png'
import gold from '../../assets/gold.png'
import diamond from '../../assets/diamond.png'
import silver from '../../assets/silver.png'
import bronze from '../../assets/bronze.png'

const Profile = ({ user }) => {
    const [data, setData] = useState(null); // Use null instead of an empty array to check for no data
    const [img, setImg] = useState(null)

    useEffect(() => {
        if (user) { // Ensure user is defined before calling fetchData
            fetchData();
        }
    }, [user]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile', {
                params: { user_id: user.id },
            });


            if (response.data.progress > 50) {
                setImg(astronaut)
            }
            else if (response.data.progress > 40) {
                setImg(diamond)
            }
            else if (response.data.progress > 30) {
                setImg(gold)
            }
            else if (response.data.progress > 20) {
                setImg(silver)
            }
            else {
                setImg(bronze)
            }

            setData(response.data);
            console.log(response.data.progress);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold">Hi {user.email.split('@')[0]}!</h1>
                {data ? (
                    <>
                        <div className="mt-4">
                            <img src={img} alt="user icon" className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300" />
                            <h2 className="text-xl mt-2">Progress: {data.progress}</h2>
                            <div className="mt-4">
                                <div>
                                    <input type="range" value={data.progress} readOnly className="w-full" />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Profile