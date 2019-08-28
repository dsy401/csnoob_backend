const rateCounter = (rates) => {
    const total = rates.length;
    if (total ===0){
        return 0
    }
    let count = 0;
    rates.forEach(s=>{
        count += s.rate
    })
    return Math.round(count/total*10)/10

}

module.exports = {
    rateCounter
}
