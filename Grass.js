
class Grass {
    constructor(x, y, mass) {
        this.type = "grass";

        this.x = x;
        this.y = y;

        this.status = HEALTHY;
        this.mass = mass || grass_origin_mass;

        this.reproduction_threshold = 4;
        this.reproduction_threshold_max = 9;
        this.reproduction_chance = 0.3;
        this.mass_min = 2;
    }

    grow() {
        if(this.status === DEAD || this.mass === 0){//disappear
            particles[this.x][this.y] = undefined;
            mass += this.mass;
        }else if(this.mass < this.mass_min){
            this.status = DEAD;
        }else if(this.mass > this.reproduction_threshold_max || (this.mass > this.reproduction_threshold && random() > this.reproduction_chance)){ // chance to reproduce
            this.multiply();
        }else if(mass > 0){ // absort energy
            mass -= 2;
            this.mass += 2;
        }else if(random() > 0.5){ // lost energy
            mass += 2;
            this.mass -= 2;
        }
    }
    // reproduce
    multiply(){
        let newPos = getNullSpace(this.x, this.y);
        if(newPos){
            this.mass -= grass_origin_mass;
            particles[newPos.x][newPos.y] = new Grass(newPos.x, newPos.y);
        }
    }
    // draw in canvas
    plot() {
        image(imgGrass[this.status], this.x * particleWidth + padding, this.y * particleHeight + padding, particleWidth - 2 * padding, particleHeight - 2 * padding);
    }
  }