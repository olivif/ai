var debug = true;

module.exports = {
    Population: Population
};

function log(message) {
    if (debug) {
        console.log(message);
    }
}
function Population(cards) {
    this.cards = cards;
}

Population.prototype.getFitness = function() {
    
    var sumIdealValue = 36;
    var productIdealValue = 360;
    
    // First half should sum up to 36 
    // Second half should have 360 as the product
    var middle = this.cards.length / 2;
    var firstHalf = this.cards.slice(0, middle);
    var secondHalf = this.cards.slice(middle, this.cards.length);
    
    log("firstHalf = " + firstHalf + " secondHalf = " + secondHalf);
    
    var sum = 0;
    firstHalf.forEach(function(item) {
        sum += item;
    });
    
    var product = 1;
    secondHalf.forEach(function(item) {
        product *= item;
    });
    
    log("sum = " + sum + " product = " + product);
    var sumError = Math.abs(sumIdealValue - sum); 
    var productError = Math.abs(productIdealValue - product); 
    log("sumError = " + sumError + " productError = " + productError);
    
    var totalError = sumError + productError;
    log("totalError = " + totalError);
    
    return {
        sumError: sumError,
        productError: productError,
        totalError: totalError
    }
}

function generateRandomPopulation() {
}

// Main
function main() {
    // Create initial population
    var populationCount = 50;
    var populations = generateRandomPopulation(populationCount);
}
