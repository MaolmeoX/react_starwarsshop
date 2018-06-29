import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import ProductCard from "./components/ProductCard";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starships: []
        }
    }

    componentDidMount() {
        axios.get(`https://swapi.co/api/starships/?page=1`)
            .then(res => {
                const startships = res.data.results;
                this.setState({starships: startships});
            })
    }

    render() {
        const loading = (this.state.starships.length > 0) ? '' : <CircularProgress className={{color: 'primary'}}/>;
        return (
            <div className="App">
                {this.state.starships.map(n => {
                    return (
                        <ProductCard product={n}/>
                    );
                })}
            </div>
        );
    }
}

export default App;
