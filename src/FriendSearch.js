import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthorization } from './AuthorizationContext';

const FriendSearch = () => {
    const [allUsersData, setAllUsersData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [friends, setFriends] = useState([]);
    const { currentUser } = useAuthorization();

    useEffect(() => {
        // Fetch all users data from your API
        const fetchAllUsers = async () => {
            try {
                const response = await axios.get('https://k9learn-back.onrender.com/all-users');
                setAllUsersData(response.data);
            } catch (error) {
                console.error('Error fetching all users data:', error);
            }
        };

        // Fetch current user's friends
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`https://k9learn-back.onrender.com/users/${currentUser._id}/friends`);
                setFriends(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchAllUsers();
        fetchFriends();
    }, [currentUser]);

    // Function to handle search
    const handleSearch = () => {
        if (!searchTerm) return; // Skip searching if the term is empty
        const results = allUsersData.filter(user =>
            user.nickname.toLowerCase().includes(searchTerm.toLowerCase()) &&
            user.nickname !== currentUser?.nickname // Exclude current user from search results
        );
        setSearchResults(results);
    };

    // Function to handle adding a user as friend
    const handleAddFriend = async (friend) => {
        try {
            // Make a POST request to add friend to the current user
            await axios.post(`https://k9learn-back.onrender.com/users/${currentUser._id}/friends`, {
                friendId: friend._id
            });
            setFriends([...friends, friend]);
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    // Utility function to check if a user is already a friend
    const isFriend = (userId) => {
        return friends.some(friend => friend._id === userId);
    };

    return (
        <div className="container mt-5">
            <h2>Пошук друзів</h2>
            <input
                type="text"
                placeholder="Введіть запит..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none', margin: '20px' }} onClick={handleSearch}>Пошук</button>

            <h3>Результати пошуку</h3>
            <div className="row">
                {searchResults.length === 0 ? (
                    <p>Пошук не дав результатів або вище не ввели ім'я друга.</p>
                ) : (
                    searchResults.map(user => (
                        <div key={user._id} className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{user.nickname}</h5>
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#ffd24a', color: 'black', border: 'none' }}
                                        onClick={() => handleAddFriend(user)}
                                        disabled={isFriend(user._id)}
                                    >
                                        {isFriend(user._id) ? 'Вже додано' : 'Додати друга'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FriendSearch;
