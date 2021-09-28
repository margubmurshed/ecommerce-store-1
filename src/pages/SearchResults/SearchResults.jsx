import React from 'react'
import { useParams, useHistory } from 'react-router';
import { Chip } from '@material-ui/core';
import { useSelector } from 'react-redux';
import ProductCard from '../../Components/ProductCard/ProductCard';

const SearchResults = () => {
    const { searchTitle } = useParams();
    const products = useSelector(({ products }) => products.length ? products : []);
    const history = useHistory();
    if (!searchTitle) history.push('/');
    const readableSearchTitle = searchTitle.split("+").join(" ");
    const foundProducts = products.filter(({ name }) => {
        console.log(name);
        console.log(readableSearchTitle);
        console.log(name.toLowerCase().includes(readableSearchTitle));
        return name.toLowerCase().includes(readableSearchTitle)
    });
    console.log(foundProducts);

    return (
        <div className="max-w-7xl m-auto">
            You Searched <Chip label={readableSearchTitle} variant="outlined" onDelete={() => console.log("Delete")} />
            <div className="flex flex-col md:flex-row">
                {foundProducts.length ? foundProducts.map(product => <ProductCard product={product} />) : <p>No Product Found</p>}
            </div>
        </div>
    )
}

export default SearchResults
