import React, { Component } from 'react';
import axios from 'axios'

class Search extends Component {
    constructor( props ) {
        super ( props );
        this.state = {
            query : '',
            results : {},
            loading : false,
            message: ''
        }
    }
    fetchSearchResults = ( query ) => {
        const config = {
            headers: {
                fkAffiliateId : 'neetish2g',
                fkAffiliateToken : 'a012d9b566634a94817b090a424f03fc'
            }
        }
        const searchUrl =  `https://affiliate-api.flipkart.net/affiliate/1.0/search.jsonp?query=${query}`;
        
        console.log(searchUrl)
         
    axios.get(searchUrl, config, {cancelToken: this.cancel}).then((res) => {
        const resultNotFoundMsg = !res.data.hits.length
				? 'There are no more search results. Please try a new search.'
                : '';
                this.setState({
                    results: res.data.hits,
                    message: resultNotFoundMsg,
                    loading: false,
                });
    }).catch((error)=> {
        if (axios.isCancel(error) || error) {
            this.setState({
                loading: false,
                message: 'Failed to fetch results.Please check network',
            });
        }
    })

    }
    handleOnInputChange = ( event ) => {
       
        this.setState({query: event.target.value, loading: true, message: ''});
        this.fetchSearchResults(event.target.value);
        if( this.cancle ) {
            this.cancle.cancel();
        }
        this.cancle = axios.CancelToken.source();

    }
    
    render() {
        const query = this.state.query;
        return (
            <div>
                <input type="text" name="search" placeholder="search..." onChange={this.handleOnInputChange} value={query} />
            </div>
        );
    }
}

export default Search;
