let frameIndex = 0; // frame counter
let y_axis_max = 400; // control y axis max value
function LineChart(parent) {
    let _height = 300;
    let _width = 350;
    let offset = 30;
    let colors = ["#4a90e2", "#417505"]
    let s = function(sketch) {

        sketch.setup = function() {
            this.canvas = sketch.createCanvas(_width,_height)
            this.canvas.parent(parent);
            if(isLoop)  sketch.loop();
            else sketch.noLoop();
            
            sketch.frameRate(speedFrame_value);
        };
        
        sketch.draw = function() {
            if(!isLoop){
                sketch.noLoop();
            }
            sketch.background(240, 255, 255);

            // x y axis
            sketch.push()
            sketch.stroke(205);
            sketch.strokeWeight(3)
            sketch.line(offset, offset, offset, _height-offset);
            sketch.line(offset, _height-offset, _width, _height-offset);
            sketch.pop()
            // x y label
            sketch.push();
            sketch.fill(205);
            sketch.textSize(14);
            sketch.text('TIME', _width-40, _height-offset/2);
            sketch.pop();

            sketch.push();
            sketch.fill(205);
            sketch.textSize(14);
            sketch.translate(45, 30);
            sketch.rotate(PI/2);
            sketch.text('NUMBER', 5, 30);
            sketch.pop();

            // line legend
            sketch.push();
            sketch.stroke(colors[0]);
            sketch.strokeWeight(2)
            sketch.line(130, offset/2, 160, offset/2);
            sketch.strokeWeight(1);
            sketch.fill(colors[0]);
            sketch.textAlign(LEFT, CENTER);
            sketch.text('Fish', 100, offset/2)
            sketch.pop();

            sketch.push();
            sketch.stroke(colors[1]);
            sketch.strokeWeight(2)
            sketch.line(240, offset/2, 270, offset/2);
            sketch.strokeWeight(1)
            sketch.fill(colors[1]);
            sketch.textAlign(LEFT, CENTER);
            sketch.text('Seaweed', 180, offset/2)
            sketch.pop();
            

            // get data for linechart
            let num_fish=0, num_grass=0, num_all=0;
            for(let i=0; i<particles.length; i++) {
                let row = particles[i]
                for (let j=0; j<row.length; j++) {
                    let cell = row[j]
                    num_all +=1;
                    if(!cell)  {
                        continue
                    }
                    else if(cell.type === 'fish')   num_fish +=1;
                    else if(cell.type === 'grass')  num_grass+=1;
                }
            }
            if(num_fish>=y_axis_max || num_grass>=y_axis_max)   y_axis_max = num_all
            // update history
            particles_history.push({
                'fish': num_fish,
                'grass': num_grass
            })
            
            // draw linechart!
            sketch.push();
            sketch.strokeWeight(2);
            sketch.stroke(colors[0]);
            sketch.noFill();
            sketch.beginShape();
            let num_interval = 100;
            for(let i=0; i<particles_history.length; i++) {
                
                if(frameIndex>=num_interval) num_interval+=int(num_interval*0.2);
                let _x = offset + (_width-offset)/num_interval*i;
                let _y = sketch.map(particles_history[i].fish, 0, y_axis_max, _height-offset, offset, true);
                sketch.curveVertex(_x, _y);
            }
            sketch.endShape();
            sketch.pop();

            sketch.push();
            sketch.strokeWeight(2);
            sketch.stroke(colors[1]);
            sketch.noFill();
            sketch.beginShape();
            num_interval = 100; 
            for(let i=0; i<particles_history.length; i++) {
                
                if(frameIndex>=num_interval) num_interval+=int(num_interval*0.2);
                let _x = offset + (_width-offset)/num_interval*i;
                let _y = sketch.map(particles_history[i].grass, 0, y_axis_max, _height-offset, offset, true);
                sketch.curveVertex(_x, _y);
               
            }
            sketch.endShape();
            sketch.pop();
            
            frameIndex+=1
      
        };
    }

    this.linechart_canvas = new p5(s, 'p5sketch1');
      
    return linechart_canvas
}