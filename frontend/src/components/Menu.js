import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reorderPosts, getPostsByCategory } from '../actions';
import { NavLink, withRouter } from 'react-router-dom';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Menu extends Component {

    filterCategories(cat){
        this.props.getPostsByCategory(cat);
    }

    render() {
        console.log('222MENU this props', this.props);
        console.log('333MENU this state', this.state);
        const { categories } = this.props;

        let cats = categories && categories.map((cat=>{
            return <NavLink onClick={() => this.filterCategories(cat.path)} exact to={`/category/${cat.path}`} key={cat.name} activeClassName="active" className="dropdown-item">{capitalizeFirstLetter(cat.name)}</NavLink>
        }))

        
        let { categoryFilter } = this.props;
        console.log('333MENU CAT FILTER:', categoryFilter);
        let catLabel = 'Categories';        
        catLabel = categoryFilter ? capitalizeFirstLetter(categoryFilter) : catLabel;

        console.log('MENU categories',categories);

        return (
            
            <div className="row pb-2">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                        <span className="navbar-brand">Readable</span>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink onClick={() => this.filterCategories()} exact to="/" activeClassName="active" className="nav-link">All</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className={`nav-link dropdown-toggle${categoryFilter && ' active'}`} id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{catLabel}</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {cats}                                        
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link">Add Post</a>
                                </li>
                            </ul>


                        </div>

                        <div className="dropdown">
                            <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort Posts By</button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a className="dropdown-item">Date: Newest</a>
                                <a className="dropdown-item">Date: Oldest</a>                                
                                <a className="dropdown-item">Score: Highest</a>
                                <a className="dropdown-item">Score: Lowest</a>                                
                            </div>
                        </div>
                    </nav>
                </div>
            </div>                             
        );
    }
}

function mapStateToProps(state, props) {
    const { categories, categoryFilter } = state;
    console.log('111MENU mapStateToProps state', state);
    console.log('111MENU mapStateToProps props', props);

    return {
        categories: categories ? categories : '',
        categoryFilter: categoryFilter ? categoryFilter : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        reorderPosts: (data) => dispatch(reorderPosts(data)),
        getPostsByCategory: (cat) => dispatch(getPostsByCategory(cat))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu))