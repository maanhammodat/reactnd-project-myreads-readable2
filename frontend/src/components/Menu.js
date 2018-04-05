import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class Menu extends Component {

    componentDidMount(){
        //this.props.getCategories();
    }

    render() {
        console.log('MENU this props', JSON.stringify(this.props));
        console.log('MENU this state', this.state);
        const { categories } = this.props;

        let cats = categories && categories.map((cat=>{
            return <Link to={`/category/${cat.path}`} key={cat.name} className="dropdown-item">{capitalizeFirstLetter(cat.name)}</Link>
        }))

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
                                <li className="nav-item active">
                                    <Link to="/" className="nav-link">All</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories</a>
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
                                <a className="dropdown-item">Date</a>
                                <a className="dropdown-item">Score</a>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>                             
        );
    }
}

function mapStateToProps(state, props) {
    const { categories } = state;
    console.log('MENU mapStateToProps state', state);
    console.log('MENU mapStateToProps props', props);

    return {
        categories: categories ? categories : ''
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //getCategories: (data) => dispatch(getCategories(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)