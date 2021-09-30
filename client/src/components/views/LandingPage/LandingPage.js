import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCard from './Sections/GridCard';

import { Typography, Row } from 'antd';
import Grid from 'antd/lib/card/Grid';
const { Title } = Typography;

function LandingPage() {

    const [movie, setMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovie(endPoint);
    }, [])

    const fetchMovie = (path) => {
        fetch(path)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setMovie([ ...movie, ...response.results]);
                setCurrentPage(response.page);
            })
    }

    const handleClick = () => {
        let endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;

        fetchMovie(endPoint);
    }

    return (
        <div style={{width: '100%', margin: 0}}>
            {/* Movie Main Image */}

            {movie[0] && 
                <MainImage 
                    image={`${IMAGE_URL}/w1280${movie[0].backdrop_path}`} 
                    title={movie[0].original_title} 
                    text={movie[0].overview} 
                />    
            }

            { /* Body */ }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <Title level={2}>Movies by latest</Title>
                <hr />

                {/* Grid Card */}
                <Row gutter={[16, 16]}>
                    {
                        movie.map((item, index) => (
                            <React.Fragment key={index}>
                                <GridCard 
                                    image={item.poster_path && `${IMAGE_URL}w500${item.poster_path}`}
                                    movieId={item.id}
                                />
                            </React.Fragment>
                        ))
                    }
                </Row>

                 {/* Load More Button */}
                 <br />
                 <div style={{ display: 'flex', justifyContent: 'center' }}>
                     <button onClick={handleClick}>Load More</button>
                 </div>
            </div>
        </div>
    )
}

export default LandingPage
