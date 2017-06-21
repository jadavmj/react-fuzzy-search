import React from 'react';
import Fuse from 'fuse.js';
import SearchResult from './SearchResult'
import Sites from '../data/sites'
import Categories from '../data/categories'

export default class SearchBox extends React.Component {
  
  constructor (props) {
  	super(props);
    this.state = { searchTerm: '', sites: [] };

    //include site categories
    var site_with_categories = [];
    for(let site of Sites) {
       var site_categories = [];
       for(let cat_id of site.categoryIds) {
          var category = Categories.find((cat) => cat.id === cat_id);
          site_categories.push(category);
       }
       site['categories'] = site_categories;
       site_with_categories.push(site);
    }

    var options = {
		  threshold: 0.0,
		  minMatchCharLength: 3,
		  keys: [
		    "siteName", 
        "categories.description"
		  ]
		};

    this.fuse = new Fuse(site_with_categories, options)
  }

  handleChange (e) {
    //get the search query
    var query = e.target.value;
    //split search query by comma
    var search_terms = query.split(",");
    var search_result = [];
    for(var search_term of search_terms) {
      var result = this.fuse.search(search_term);
      search_result = [...search_result, ...result];
    }
    //remove duplicates
    search_result = search_result.filter((site, index, self) => self.findIndex(s => s.id === site.id) === index);
    this.setState({searchTerm: e.target.value, sites: search_result});
  }

  render() {
    return (
      <div>
      	<input type="text" onChange={(e) => {this.handleChange(e)}} placeholder="Search Sites..." />
      	<SearchResult sites={this.state.sites}/>
      </div>
    );
  }

}