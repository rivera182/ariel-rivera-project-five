import React from 'react';
import Masonry from 'react-masonry-css';
import DefaultNewsImage from '../assets/news.jpg';

const Main = (props) => {

    // Breakpoint columns for masonry jsx
    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return(
        <main>
            <div className="wrapper">
                <h2>
                    {/*  If Statement to each category title when not on homepage. */}
                    {props.title === '' ?
                        'Top Articles'   
                    :
                        `Top Articles for ${props.title.toUpperCase()}`    
                     }
                </h2>
                <div className="articles-container">
                    <Masonry 
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid-column"
                    >    
                        {/* mapping news array for page */}
                        {props.news.map((article, index) => (
                            index < 40 ? 
                            <div key={index} className="single-news-container">
                                    <div
                                        className="remove-post"
                                        onClick={() => props.removePost(article.title)}
                                    >
                                        <i class="fas fa-times-circle"></i>
                                    </div>
                                    <div
                                        className="news-cell"
                                        onClick={() => props.articleClick(article.url)}
                                    >

                                        {/* if statement for missing images */}
                                        {!article.urlToImage ?
                                            <img src={DefaultNewsImage} alt="No available image" />
                                            :
                                            
                                                <img src={article.urlToImage} alt="" />
                                        }
                                        
                                        <h3>{article.title}</h3>
                                        <p>{article.description}</p>
                                        <p>{article.author}</p>
                                    </div>
                            </div>
                            : null    
                        ))}
                    </Masonry>
                </div>
            </div>
        </main>
    )
}

export default Main;