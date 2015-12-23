const should = require("should");

const main = require("index");
const Population = main.Population;
const Individual = main.Individual;
const GA = main.GA;

describe("ten card problem tests", function() {
    
    var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    
    describe("individual tests", function() {
    
        it("should have a correct fitness function", function(done) {
            
            var individual = new Individual(cards);
            var fitness = individual.getFitness();
            
            fitness.sumError.should.eql(21);
            fitness.productError.should.eql(29880);
            fitness.totalError.should.eql(29901);
            
            done();
        });
  
        it("should be able to generate a card", function(done) {
        
            var card = Individual.randomCard();
            
            should.exist(card);
            card.should.be.below(10);
            
            done();
        });
        
        it("should be able to generate an individual", function(done) {
        
            var size = 10;
            var individual = new Individual();
            individual.random(size);
            
            should.exist(individual);
            individual.cards.length.should.eql(size);
            
            done();
        });
    });
        
    describe("population tests", function() {
        
        it("should be able to generate an empty population", function(done) {
        
            var population = new Population();
            
            should.exist(population);
            
            done();
        });
        
        it("should be able to add an individual", function(done) {
        
            var population = new Population();
            population.addIndividual(new Individual());
            
            should.exist(population);
            should.exist(population.individuals);
            population.individuals.length.should.eql(1);
            
            done();
        });
        
        it("should be able to generate a random population", function(done) {
        
            var size = 5;
            var individualSize = 10;
            var population = new Population();
            population.random(size, individualSize);
            
            should.exist(population);
            should.exist(population.individuals);
            population.individuals.length.should.eql(size);
            population.individuals[0].cards.length.should.eql(individualSize);
            
            done();
        });
        
        it("should be able to pick one individual from populations", function(done) {
            
            var size = 5;
            var individualSize = 10;
            var population = new Population();
            population.random(size, individualSize);
            
            var individuals = population.pick();
            
            should.exist(individuals);
            individuals.should.be.array;
            individuals.length.should.eql(1);
            individuals[0].should.be.above(-1);
            individuals[0].should.be.below(cards.length);
            
            done();
        });
        
        it("should cap the individuals number when picking multiple from populations", function(done) {
            
            var size = 5;
            var individualSize = 10;
            var population = new Population();
            population.random(size, individualSize);
            
            var individualsCount = 10;
            var individuals = population.pick(individualsCount);
            
            should.exist(individuals);
            individuals.should.be.array;
            individuals.length.should.eql(size);
            
            done();
        });
        
         it("should be able to pick multiple from populations", function(done) {
            
            var size = 5;
            var individualSize = 10;
            var population = new Population();
            population.random(size, individualSize);
            
            var individualsCount = 5;
            var individuals = population.pick(individualsCount);
            
            should.exist(individuals);
            individuals.should.be.array;
            individuals.length.should.eql(individualsCount);
            
            done();
        });
        
    });
    
    describe("GA tests", function() {
         it("should be able to select a loser", function(done) {
            
            var size = 5;
            var individualSize = 10;
            var population = new Population();
            population.random(size, individualSize);
            
            var individualsCount = 2;
            var individuals = population.pick(individualsCount);
            
            var loserIndex = GA.selectLoser(population, individuals[0], individuals[1]);
            
            should.exist(loserIndex);
            loserIndex.should.be.above(-1);
            
            var loser = population.individuals[loserIndex];
            should.exist(loser);
            
            var first = population.individuals[individuals[0]];
            var second = population.individuals[individuals[1]];
            
            console.log("first = " + first.getFitness().totalError + " second = " + second.getFitness().totalError);
            
            var expectedLoserIndex = (first.getFitness().totalError > second.getFitness().totalError) ? individuals[0] : individuals[1];
            
            expectedLoserIndex.should.eql(loserIndex);
            
            done();
        });
    });

});
    