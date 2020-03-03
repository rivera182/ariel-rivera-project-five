import React, { Component } from 'react';
import axios from 'axios';


//Components
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();

    this.state = {
      news: [],
      isLoading: true,
      category: '',
      country: '',
      title: '',
      menus: {
        category: false,
        country: false
      }
    }
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      responseType: 'json',
      params: {
        apiKey: '1138489a75ea4722ae7c10e95975584f',
        language: 'en',
        pageSize: '100',
        page: 1
      }
    }).then((response) => {
      // put response in const
      const articles = response.data.articles;
      //filter the response for any duplicates
      const filterArray = articles.filter((article, index, array) => {
        //Only return one array index with same title
        return array.findIndex(secondIndex =>(secondIndex.title === article.title)) === index
      });
      //Set state with filtered array  
      this.setState({
        news: filterArray,
        isLoading: false
      })
    })
  }

  //to change the category of news post displaying
  categoryChange = (category) => {
    console.log(category);
    this.setState({
      isLoading: true,
      category: category
    });
    axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      responseType: 'json',
      params: {
        apiKey: '1138489a75ea4722ae7c10e95975584f',
        country: 'ca',
        category: category,
        pageSize: '100',
        page: 1
      }
    }).then((response) => {
      // put response in const
      const articles = response.data.articles;
      //filter the response for any duplicates
      const filterArray = articles.filter((article, index, array) => {
        //Only return one array index with same title
        return array.findIndex(secondIndex => (secondIndex.title === article.title)) === index
      });
      this.setState({
        news: filterArray,
        isLoading: false,
        title: category
      })
    })

  }

  //this is to change the api query for country
  countryChange = (country) => {
    //set country in you state and turn loading on.
    
    this.setState({
      isLoading: true,
      country: country
    });
    axios({
      method: 'GET',
      url: 'https://newsapi.org/v2/top-headlines',
      responseType: 'json',
      params: {
        apiKey: '1138489a75ea4722ae7c10e95975584f',
        country: 'ca',
        country: country,
        pageSize: '100',
        page: 1
      }
    }).then((response) => {
      // put response in const
      const articles = response.data.articles;
      //filter the response for any duplicates
      const filterArray = articles.filter((article, index, array) => {
        //Only return one array index with same title
        return array.findIndex(secondIndex => (secondIndex.title === article.title)) === index
      });
      let countryName;
      if(country === "ca"){
        countryName = "Canada"
      } else if (country === "us") {
        countryName = "United States"
      } else if (country === "gb"){
        countryName = "England"
      }

      this.setState({
        news: filterArray,
        isLoading: false,
        title: countryName
      })
    })

  }


  //remove displayed Post
  removeDisplayPost = (articleTitle) => {
    //filter out removed post from news array.
      const newNews = this.state.news.filter(article => (
        article.title !== articleTitle
      ));
      //set new filtered array as news state
      this.setState({
        news: newNews
      });  
  }

  //this handles the menu category/country dropdown.
  menuClickHandler = (menuItem) => {
    if(menuItem === "country") {
      this.setState({
        menus: {
          category: false,
          country: !this.state.menus.country
        }
      })
    } else if(menuItem === "category") {
      this.setState ({
        menus: {
          category: !this.state.menus.category,
          country: false
        }
    })
  } 
}

//Open article in new tab
articleLink = (link) => {
  window.open(link, '_blank');
}
  

  render() {
    return (
      <div className="App">
        <Header
          categoryChange={this.categoryChange}
          countryChange={this.countryChange}
          menuClick={this.menuClickHandler}
          menus ={this.state.menus}
        />
        {/* //this is a statement for if the news posts are loading or not */}
        {this.state.isLoading ?
            <div className="loading-container">
              <i class="fas fa-sync fa-spin"></i>
            </div>
          :
          <Main 
            news={this.state.news} 
            removePost ={this.removeDisplayPost}
            articleClick={this.articleLink}
            title={this.state.title}
          />
        }

          <Footer />
      </div>
    );
  }
}

export default App;