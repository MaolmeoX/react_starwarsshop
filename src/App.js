import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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
        return (
            <div className="App">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Model</TableCell>
                                <TableCell>Manufacturer</TableCell>
                                <TableCell numeric>Price (credits)</TableCell>
                                <TableCell numeric>length</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.starships.map(n => {
                                return (
                                    <TableRow key={n.name}>
                                        <TableCell component="th" scope="row">
                                            {n.name}
                                        </TableCell>
                                        <TableCell>{n.model}</TableCell>
                                        <TableCell>{n.manufacturer}</TableCell>
                                        <TableCell numeric>{n.cost_in_credits}</TableCell>
                                        <TableCell numeric>{n.length}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

export default App;
