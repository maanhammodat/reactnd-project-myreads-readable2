import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCategories, reorderPosts, getPostsByCategory } from '../actions';
import { NavLink, withRouter } from 'react-router-dom';
import { capitalizeFirstLetter } from '../util/capitalizeFirstLetter';

class Menu extends Component {

    constructor() {
        super();
        this.orderPostsBy = this.orderPostsBy.bind(this);
    }

    componentDidMount(){
        this.props.getCategories();
    }

    filterCategories(cat){
        this.props.getPostsByCategory(cat);
    }

    orderPostsBy(e) {
        const order = e.target.value;
        this.props.reorderPosts(order);
    }

    render() {
        const { categories } = this.props;

        let cats = categories && categories.map((cat=>{
            return <NavLink onClick={() => this.filterCategories(cat.path)} exact to={`/${cat.path}`} key={cat.name} activeClassName="active" className="dropdown-item">{capitalizeFirstLetter(cat.name)}</NavLink>
        }))

        let { categoryFilter, postOrder } = this.props;
        let catLabel = 'Categories';
        catLabel = categoryFilter ? capitalizeFirstLetter(categoryFilter) : catLabel;

        return (

            <div className="row pb-2">
                <div className="col">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

                        <NavLink onClick={() => this.filterCategories()} to="/"><span className="navbar-brand">Readable</span></NavLink>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarColor01">

                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink onClick={() => this.filterCategories()} exact to="/" activeClassName="active" className="nav-link">All</NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{catLabel}</a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        {cats}
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <NavLink onClick={() => this.filterCategories()} exact to="/add-post" key="add-post" activeClassName="active" className="nav-link">Add Post</NavLink>
                                </li>
                            </ul>

                        </div>

                        <span className="nav-item nav-link disabled">Sort By:</span>

                        <div className="col-2 pl-0 pr-0">
                            <select value={postOrder} onChange={this.orderPostsBy} className="form-control form-control-sm" id="exampleSelect1">
                                <option value="newest">Date: Newest</option>
                                <option value="oldest">Date: Oldest</option>
                                <option value="highest">Score: Highest</option>
                                <option value="lowest">Score: Lowest</option>
                            </select>
                        </div>

                    </nav>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    const { categories, categoryFilter, postOrder } = state;

    return {
        categories,
        categoryFilter,
        postOrder
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: (data) => dispatch(getCategories(data)),
        reorderPosts: (data) => dispatch(reorderPosts(data)),
        getPostsByCategory: (cat) => dispatch(getPostsByCategory(cat))
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu))