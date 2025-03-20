const displayINRCurrency  = (nam) => {
    // create 
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      });
      return formatter.format(nam)
}

export default displayINRCurrency