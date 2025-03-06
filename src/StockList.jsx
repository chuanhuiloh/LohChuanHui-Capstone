import { useContext, useEffect, useState } from "react";
import StockFormContext from "./contexts/StockFormContext";
import "./StockStyling.css";

function StockList() {
    const stockFormContextValue = useContext(StockFormContext);
    if (stockFormContextValue.stockList.length === 0) {
        return (
            <div>
              <h2>Stock List</h2>
              <p>No stocks added yet.</p>
            </div>
        )
    } else {
        return (
            <div className="stock-list">
                {stockFormContextValue.stockList.map(stock => 
                <StockPost 
                    ticker={stock.ticker}
                    qty={stock.qty}
                    purchase_price={stock.purchasePrice}
                    current_price={stock.currentPrice}
                    profit_loss={stock.profitLoss}
                />)}
            </div>
        )
    }
    }


function StockPost(props) {
    return (
        <div className="stock-post">
            <h2>Symbol: {props.ticker}</h2>
            <p>Quantity: {props.qty}</p>
            <p>Purchase Price: {props.purchase_price}</p>
            <p>Current Price: {props.current_price}</p>
            <p>Profit/Loss: <span className={
                props.profit_loss >= 0 ?
                "profit" :
                "loss"
            }>{props.profit_loss.toFixed(2)}</span>
            </p>
        </div>
    )
}

export default StockList;