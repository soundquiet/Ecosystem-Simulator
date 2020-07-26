class Fish {
    constructor(x, y, mass) {
        this.type = "fish";

        this.x = x;
        this.y = y;

        this.status = HEALTHY;
        this.mass = mass || fish_origin_mass;
        
        this.reproduction_threshold = 40;
        this.reproduction_threshold_max = 120;
        this.reproduction_chance = 0.1;
        this.mass_min = 8;
    }

    grow() {
        if(this.status === DEAD){ //disappear
            particles[this.x][this.y] = undefined;
            mass += this.mass;
        }else if(this.status === ELECTRIC){//disappear
            particles[this.x][this.y] = undefined;
        }else if(this.mass < this.mass_min){ //disappear
            this.status = DEAD;
        }else{
            if((this.mass > this.reproduction_threshold_max || (this.mass > this.reproduction_threshold && random() > this.reproduction_chance)) && this.status === HEALTHY){ // chance to reproduce
                this.multiply();
            }else if((random() > 0.5)|| this.status === HUNGRY){ // chance to eat or hungry
                this.eatGrass();
            }else if((random() > 0.6)){ //chance to swim
                this.swim();
            }
        }
    }

    swim(){
        let newPos = getNullNeighborSpace(this.x, this.y);
        if(newPos){
            let lost = parseInt(this.mass / 3);
            this.mass -= lost;
            mass += lost;
            particles[this.x][this.y] = undefined;
            particles[newPos.x][newPos.y] = this;
            this.x = newPos.x;
            this.y = newPos.y;
        }
    }

    eatGrass(){
        let grass = findGrass(this.x, this.y, this.mass);
        if(grass){
            this.mass += particles[grass.x][grass.y].mass;
            particles[grass.x][grass.y].mass = 0;

            particles[grass.x][grass.y] = this;
            particles[this.x][this.y] = undefined;
            this.x = grass.x;
            this.y = grass.y;
            this.status = HEALTHY;
        }else{
            if(this.mass < this.mass_min + 3){
                this.status = HUNGRY;
            }
            if(this.mass > 2 *this.mass_min || random() > 0.5)
                this.swim();
        }
    }
    // reproduce
    multiply(){
        let newPos = getNullSpace(this.x, this.y);
        if(newPos){
            this.mass -= fish_origin_mass;
            particles[newPos.x][newPos.y] = new Fish(newPos.x, newPos.y);
        }
    }
    // draw in canvas
    plot() {
        image(imgFish[this.status], this.x * particleWidth + padding, this.y * particleHeight + padding, particleWidth - 2 * padding, particleHeight - 2 * padding);  
    }
  }