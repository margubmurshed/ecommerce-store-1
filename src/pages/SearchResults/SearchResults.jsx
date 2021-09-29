import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import ProductCard from '../../Components/ProductCard/ProductCard';

const SearchResults = () => {
    const { searchTitle } = useParams();
    const products = useSelector(({ products }) => products.length ? products : []);
    const history = useHistory();
    const [filter, setFilter] = useState('none');

    const handleChange = e => {
        setFilter(e.target.value);
    }

    if (!searchTitle) history.push('/');
    const readableSearchTitle = searchTitle.split("+").join(" ");
    const foundProducts = products.filter(({ name }) => {
        return name.toLowerCase().includes(readableSearchTitle)
    });

    const filterProducts = () => {
        switch (filter) {
            case 'none':
                return foundProducts.map(_ => _);;
            case 'lowPriceToHighPrice':
                return foundProducts.map(_ => _).sort((a, b) => a.price - b.price);
            case 'highPriceToLowPrice':
                return foundProducts.map(_ => _).sort((a, b) => b.price - a.price);
            default: return []
        }
    }

    return (
        <div className="max-w-7xl m-auto py-5">
            {/* Results Header */}
            <div className="flex items-center justify-between px-5">
                <p className="text-sm md:text-base">Found <strong>{foundProducts.length}</strong> products</p>
                <div className="">
                    <FormControl fullWidth>
                        <Select value={filter} onChange={handleChange}>
                            <MenuItem value='none'>None</MenuItem>
                            <MenuItem value='lowPriceToHighPrice'>Low Price To High Price</MenuItem>
                            <MenuItem value='highPriceToLowPrice'>High Price To Low Price</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 p-5">
                {foundProducts.length ? filterProducts().map(product => <ProductCard product={product} />) : <p>No Product Found</p>}
            </div>
        </div>
    )
}

export default SearchResults
