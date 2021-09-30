import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage';
import { Descriptions, Button, Row } from 'antd';
import GridCard from '../LandingPage/Sections/GridCard';

function MovieDetailPage(props) {

    const [movie, setMovie] = useState([]);
    const [crew, setCrew] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        const movieId = props.match.params.movieId
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
            .then((response) => response.json())
            .then((response) => {
                setMovie(response);
                fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
                    .then((response) => response.json())
                    .then((response) => {
                        setCrew(response.cast);
                    })
            })
    },[])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return(
        <div>
            {/* Movie Main Image */}

            {movie && 
                <MainImage 
                    image={`${IMAGE_URL}/w1280${movie.backdrop_path}`} 
                    title={movie.original_title} 
                    text={movie.overview} 
                />    
            }

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button>Add to Favorite</Button>
                </div>

                {/* Movie Info Table */}
                <Descriptions title="Movie Info" bordered>
                    <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>{movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br /><br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View</Button>
                </div>

                {/* Grid Cards For Crew */}
                <br /><br />
                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            crew.map((cast, index) => (
                                cast.profile_path &&
                                <GridCard actor image={`${IMAGE_URL}w500${cast.profile_path}`} characterName={cast.characterName} />
                            )) 
                        }
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetailPage;