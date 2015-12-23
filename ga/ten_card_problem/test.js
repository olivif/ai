const should = require("should");

const main = require("index");
const Population = main.Population;

describe("ten card problem tests", function() {
    
    describe("population tests", function() {
    
        it("should have a correct fitness function", function(done) {
            
            var cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            
            var population = new Population(cards);
            var fitness = population.getFitness();
            
            fitness.sumError.should.eql(21);
            fitness.productError.should.eql(29880);
            fitness.totalError.should.eql(29901);
            
            done();
        });
    
    });
    
});