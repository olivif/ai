var debug = true;

module.exports = {
    Individual: Individual,
    Population: Population,
    GA: GA
};

function log(message) {
    if (debug) {
        console.log(message);
    }
}

// ----------------------------------------------------------------------------
// Individual
function Individual(cards) {
    this.cards = cards === null || cards === undefined ? [] : cards;
}

Individual.randomCard = function() {
    return Math.round(Math.random() * 1000) % 10;
}
    
Individual.prototype.random = function(size) {
    log("random individual of size = " + size);
    for (var index = 0; index < size; index++) {
        this.cards.push(Individual.randomCard());
    }
}

Individual.prototype.getRandomCardIndex = function() {
    return Math.round(Math.random() * 1000) % this.cards.length;
}

Individual.prototype.getRandomCardValue = function() {
    return this.cards[this.getRandomCardIndex()];
}

Individual.prototype.replaceRandomCard = function(card) {
    this.cards[this.getRandomCardIndex()] = card;
}

Individual.prototype.getFitness = function() {
    
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

// ----------------------------------------------------------------------------
// Population
function Population() {
    this.individuals = [];
}

Population.prototype.addIndividual = function(individual) {
    this.individuals.push(individual);
}

Population.prototype.random = function(size, individualSize) {
    for (var index = 0; index < size; index++) {
        var individual = new Individual();
        individual.random(individualSize);
        this.addIndividual(individual);
    }
}

Population.prototype.pick = function(individualsCount) {
    
    var that = this;
    var pickOne = function() {
        return Math.round(Math.random() * 1000) % that.individuals.length;
    };
    
    var count = (individualsCount === null || individualsCount === undefined) ? 1 : individualsCount;
    count = Math.min(count, this.individuals.length);
    
    log("Picking " + count + " individuals");
    
    var individuals = [];
    
    while(individuals.length < count) {
        
        var picked = pickOne();
        if (individuals.indexOf(picked) === -1) {
            individuals.push(picked);
        }
    }
    
    log(individuals);
    return individuals;
}

Population.prototype.getFitness = function() {
}

// ----------------------------------------------------------------------------
// GA
function GA() {
    
}

GA.rankIndividuals = function (population, firstIndex, secondIndex) {
    
    var first = population.individuals[firstIndex];
    var second = population.individuals[secondIndex];
            
    var loserIndex =
     (first.getFitness().totalError > second.getFitness().totalError) 
        ? firstIndex
        : secondIndex;
    
    return {
        loser: loserIndex,
        winner: firstIndex === loserIndex ? secondIndex : firstIndex
    };
}

GA.recombine = function (population, winnerIndex, loserIndex) {
    // Take something from the winner and give it to the loser
    // This part can probably be made *smarter*
    var winnerCard = population.individuals[winnerIndex].getRandomCardValue();

    log("Recombining ...");    
    log(population.individuals[loserIndex].cards);
    population.individuals[loserIndex].replaceRandomCard(winnerCard);
    log(population.individuals[loserIndex].cards);
    
    return population;
}

GA.mutate = function (population, loserIndex) {
    // Replace a random card with a random value
    var randomCard = Individual.randomCard();
    log("Mutating ...");    
    log(population.individuals[loserIndex].cards);
    population.individuals[loserIndex].replaceRandomCard(randomCard);
    log(population.individuals[loserIndex].cards);
    
    return population;
}

GA.iterate = function (population) {
    
    // Pick two individuals
    var individuals = population.pick(2);
    log("Picked " + individuals);
    
    // Select winer and loser
    var ranked = GA.rankIndividuals(population, individuals[0], individuals[1]);
    log("Winner " + ranked.winner + " loser " + ranked.loser);
    
    // Recombine loser 
    population = GA.recombine(population, ranked.winner, ranked.loser);
    
    // Mutate loser
    population = GA.mutate(population, ranked.loser);
    
    return population;
}


// ----------------------------------------------------------------------------
// Main
function main() {
    // Create initial populations
    // 10 is the size (i.e. number of cards), 50 is the nummber of sets of cards
    var size = 10;
    var count = 50;
    var populations = generatePopulations(size, count);
    log("Generated " + populations.length + " populations");
    
}
