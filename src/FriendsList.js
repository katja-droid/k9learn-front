import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuthorization();
    const [error, setError] = useState(null);

    const fetchFriends = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://k9learn-back.onrender.com/users/${currentUser._id}/friends`);
            setFriends(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Failed to fetch friends');
            setLoading(false);
        }
    };

    const removeFriend = async (friendId) => {
        try {
            await axios.delete(`https://k9learn-back.onrender.com/users/${currentUser._id}/friends/${friendId}`);
            setFriends(friends.filter(friend => friend._id !== friendId));
        } catch (error) {
            console.error('Error removing friend:', error);
            setError('Failed to remove friend');
        }
    };

    useEffect(() => {
        if (currentUser) {
            fetchFriends();
        }
    }, [currentUser]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <h2>Мої друзі</h2>
            <div className="row">
                {friends.length > 0 ? (
                    friends.map(friend => (
                        <div key={friend._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{friend.nickname}</h5>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none'}}
                                        onClick={() => removeFriend(friend._id)}
                                    >
                                        Видалити друга
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>У вас поки що немає друзів.</p>
                )}
            </div>
        </div>
    );
};

export default FriendsList;
