import React, { Component } from 'react';
import './App.css';
import ListStarships from "./components/ListStarships";
import Cart from "./components/Cart";
import Filters from "./components/Filters";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {starships: [], loading: false, nextPage: null, filters: {name: ''}};
    }

    componentDidMount() {
        this.loadStarships('https://swapi.co/api/starships');
        window.addEventListener('scroll', (e) => {
            if (!this.state.loading && this.state.nextPage && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                this.loadStarships(this.state.nextPage);
            }
        });
    }

    loadStarships(url) {
        this.setState({loading: true});
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const starships = data.results;
                for (let i = 0; i < starships.length; i++) {
                    starships[i].in_cart = 0;
                    starships[i].stock = Math.floor(Math.random() * 10);
                }
                this.setState({starships: [...this.state.starships, ...starships], loading: false, nextPage: data.next});
            });
    }

    editStarship(starship, action) {
        const { starships } = this.state;

        const StarshipsCopy = [...starships];

        const index = StarshipsCopy.findIndex(s => s.url === starship.url);

        switch (action) {
            case 'ADD_TO_CART':
                if (StarshipsCopy[index].stock  > 0) {
                    StarshipsCopy[index].in_cart++;
                    StarshipsCopy[index].stock--;
                } else {
                    alert('Plus de stock !');
                }
                break;
            case 'REMOVE_FROM_CART':
                StarshipsCopy[index].in_cart--;
                StarshipsCopy[index].stock++;
                break;
            default:
                console.error('Unknown action: ' + action);
        }

        this.setState({starships: StarshipsCopy});
    }

    filterChange(name, value) {
        const filter = {};
        filter[name] = value;
        this.setState({filters: {...this.state.filters, ...filter}});
    }

    render() {

        const filteredStarships = this.state.starships.filter(starship => {
            return starship.name.toLowerCase().indexOf(this.state.filters.name.toLowerCase()) > -1;
        });
        const cartStarships = this.state.starships.filter(starship => starship.in_cart > 0);

        return (
            <div className="container">

                <h1>Liste des vaisseaux</h1>

                <Filters filterChange={(name, value) => this.filterChange(name, value)}/>

                <div className="homepage">
                    <ListStarships starships={filteredStarships} editStarship={(starship, action) => this.editStarship(starship, action)}/>
                    <Cart starships={cartStarships} editStarship={(starship, action) => this.editStarship(starship, action)}/>
                </div>

            </div>
        );
    }
}

export default App;
