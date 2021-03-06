const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
      <label className="label huge">
        <h3> {choice[Number(!isDeposit)]}</h3>
        <input id="number-input" type="number" width="200" onChange={onChange}></input>
        <input disabled={isValid} type="submit" width="200" value="Submit" id="submit-input"></input>
      </label>
    );
  };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('')
    const [validTransaction, setValidTransaction] = React.useState(false);
  
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    
    
    const handleChange = (event) => {
      const inputNumber = Number(event.target.value)
      console.log(`handleChange ${event.target.value}`);
      setDeposit(inputNumber);
      (inputNumber > totalState && atmMode === 'Cash Back') ? setValidTransaction(true) : setValidTransaction(false);
    };
  
  
    const withdraw = (accountBalance, withDrawalAmount) => {
      if (accountBalance >= withDrawalAmount) {
        return accountBalance - withDrawalAmount
      };
      alert(`Not enough balance in account!` )
      return accountBalance;
  
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let newTotal = isDeposit ? totalState + deposit : withdraw(totalState, deposit);
      setTotalState(newTotal);
      setValidTransaction(false);
  
    };
  
    const handleModeSelect = (event) => {
      const value = event.target.value;
      setAtmMode(value)
  
      if (value) (value === 'Deposit') ? setIsDeposit(true) : setIsDeposit(false);
      event.preventDefault();
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Deposit</option>
          <option id="cashback-selection" value="Cash Back">Cash Back</option>
        </select>
        { atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>}
      </form>
    );
  };
  // ========================================
  ReactDOM.render(<Account />, document.getElementById('root'));
  
  
