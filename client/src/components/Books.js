import React from "react";
import axios from "axios";
import API from "../utils/API";

class Books extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "",
            books: []
        }
    }
    handleClick = e => {
        let query = this.state.value
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&key=AIzaSyBlTvz-kApJ0ZhYyKIPLl9as7hWtP8Su88`)
            .then((response) => {
                let booksArr = response.data.items
                let newArr = booksArr.map(book => {
                    let newBook = {}
                    newBook.title = book.volumeInfo.title;
                    newBook.author = book.volumeInfo.authors;
                    newBook.datePublished = book.volumeInfo.publishedDate;
                    newBook.link = book.selfLink
                    return newBook
                });
                
                this.setState({books: newArr}) 

            }).catch(err => {
            console.log(err);
            this.setState({value: ""})
        })
    }

    

    handleChange = e => {
        this.setState({value: e.target.value})
    }
    
    render () {
        return (
            <div className="container" style={style.bookSearch}>Search Books
                <div className="resultsHere"></div>
                <ul>
                {this.state.books.map(book => {
                    return <li>{book.title}</li>
                })}
                </ul>
                {this.state.value}
                <hr></hr>
                <input type="text" name="userBook" value={this.state.value} onChange={this.handleChange}></input>
                <button onClick={this.handleClick}>Submit</button>
            </div>
        )
    }
}

const style = {
    bookSearch: {
      border: "solid green",
      height: 500,
      width: 500,
      float: "left"
    }
}

export default Books