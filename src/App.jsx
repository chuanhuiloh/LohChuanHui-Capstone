import './App.css'
import StockForm from './StockForm'
import Header from './Header'
import StockFormContext from './contexts/StockFormContext'
import { useState } from 'react';


function App() {
  const [stockList, setStockList] = useState([]);

  return (
    <>
      <Header
        title="FINANCE DASHBOARD"
      />
      <StockFormContext.Provider
        value={{
          stockList,
          setStockList
        }}
      >
        <StockForm/>
      </StockFormContext.Provider>
    </>
  )
}

export default App
