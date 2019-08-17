class result{
    constructor(){
        this.IsSuccess = true;
        this.ErrorMessage = null;
        this.Data = null;
    }

    reset(){
        this.IsSuccess = true;
        this.ErrorMessage = null;
        this.Data = null;
    }
}

module.exports = new result()
