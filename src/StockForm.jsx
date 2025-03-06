import { useCallback, useContext, useEffect, useState } from "react";
import "./StockStyling.css"
import StockList from "./StockList";
import StockFormContext from "./contexts/StockFormContext";

function StockForm() {
    const [stockTicker, setStockTicker] = useState('');
    const [stockQty, setStockQty] = useState(0);
    const [stockPurchasePrice, setStockPurchasePrice] = useState(0);
    const stockFormContextValue = useContext(StockFormContext);
    const [stockQuote, setStockQuote] = useState({});

    const fetchStockData = useCallback(() => {
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
            stockTicker +
            "&apikey=PP73Y1DWJLF5EM96")
            .then((res) => res.json())
            .then((data) => setStockQuote(data['Global Quote']));
    }, [stockTicker]);

    useEffect(() => {
        fetchStockData();
    }, [fetchStockData]);

    return (
        <>
            <div className="stockform">
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Stock Ticker"
                        onBlur={(event)=>{
                            setStockTicker(event.target.value);
                        }}
                    />
                    <input 
                        type="number" 
                        placeholder="Quantity"
                        onBlur={(event)=>{
                            setStockQty(event.target.value);
                        }}
                    />
                    <input 
                        type="number" 
                        placeholder="Purchase Price" 
                        onBlur={(event)=>{
                            setStockPurchasePrice(event.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            if (Object.keys(stockQuote).length === 0) {
                                alert('Invalid Stock Ticker');
                                return;
                            }
                            if (!(stockTicker && stockQty && stockPurchasePrice)) {
                                alert('Please fill up all fields');
                                return;
                            }
                            stockFormContextValue.setStockList((currList) => [
                            ...currList,
                            {
                                ticker: stockTicker,
                                qty: stockQty,
                                purchasePrice: parseFloat(stockPurchasePrice),
                                currentPrice: parseFloat(stockQuote["05. price"]),
                                profitLoss: ((parseFloat(stockQuote["05. price"])-parseFloat(stockPurchasePrice)) * stockQty)
                            }
                        ])}}
                    

                    >Add Stock
                    </button>
                
                </div>
            </div>
            <br></br>
            <StockList />
        </>  
    )
      
}

export default StockForm;