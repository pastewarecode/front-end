import React, { useEffect, useState } from 'react';

const ChuckNorris = ({ token }) => {
    const [fact, setFact] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchFact = async () => {
            setLoading(true);

            try {
                const response = await fetch('http://localhost:3333/fact', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                const data = await response.json();

                if (response.ok && data.fact) {
                    setFact(data.fact);
                    setError('');
                    setLoading(false);
                } else {
                    setError(data.message || 'Failed to fetch fact');
                    setLoading(false);
                }
            }
            catch (err) {
                setError('Server error. Try again later.');
            }
            finally {
                setLoading(false);
            }
        }

        fetchFact();
    } ,[token]);


    return (
        <div>
            {loading ? (
                //Display a spinner while loading
                 <div>
                    <div className="spinner"></div>
                 </div>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <h2>Chuck Norris Fact: {fact}</h2>
            )}
        </div>
    )
}


export default ChuckNorris;