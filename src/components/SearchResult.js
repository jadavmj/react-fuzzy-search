import React from 'react';

export default class SearchResult extends React.Component {

  render() {
    if(this.props.sites.length == 0) {
      return (<p>We currently don’t have any results for your search, try another.</p>)
    } else {
      return (
        	<table>
        		<tbody>
  	      		{this.props.sites.map(function(site, index){
  	                return (<tr key={index}>
                              <td>
                                <p><a href={site.siteUrl}>{site.siteUrl}</a></p>
                                <p>{site.description}</p>
                              </td>
                           </tr>);
  	          })}
  	        </tbody>
        	</table>
      );
    }
  };

}