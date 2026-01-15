import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects, getRandomProjects } from '../Projects';
import p5 from 'p5';
import color1 from "../../assets/color1.jpeg";
import ars9 from "../../assets/ars9.jpeg";
import colorVideo from "../../assets/color.mp4";

// P5.js Color Contest Sketch Component
function ColorContestSketch() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);
  const [winner, setWinner] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }

    if (!sketchRef.current) return;
    
    const sketch = (p) => {
      class Cube {
        constructor(cubeSize) {
          this.x = 0;
          this.y = 0;
          this.dims = cubeSize;
          this.color1 = 255;
          this.color2 = 255;
          this.color3 = 255;
          this.isRed = false;
          this.isBlue = false;
          this.isGreen = false;
          this.isYellow = false;
          this.isWhite = false;
        }

        printCube(i, j) {
          p.fill(this.color1, this.color2, this.color3);
          p.rect(i, j, this.dims, this.dims);
        }

        setColor1(currColorNum) { this.color1 = currColorNum; }
        setColor2(currColorNum) { this.color2 = currColorNum; }
        setColor3(currColorNum) { this.color3 = currColorNum; }
        getColor1() { return this.color1; }
        getColor2() { return this.color2; }
        getColor3() { return this.color3; }
        getDims() { return this.dims; }
        
        setAllToFalse() {
          this.isRed = false;
          this.isBlue = false;
          this.isGreen = false;
          this.isYellow = false;
        }
        
        setIsRed(currBoolean) { this.isRed = currBoolean; }
        setIsBlue(currBoolean) { this.isBlue = currBoolean; }
        setIsGreen(currBoolean) { this.isGreen = currBoolean; }
        setIsYellow(currBoolean) { this.isYellow = currBoolean; }
        setIsWhite(currBoolean) { this.isWhite = currBoolean; }
        setX(xVal) { this.x = xVal; }
        setY(yVal) { this.y = yVal; }
        
        getIsWhite() { return this.isWhite; }
        getIsRed() { return this.isRed; }
        getIsBlue() { return this.isBlue; }
        getIsGreen() { return this.isGreen; }
        getIsYellow() { return this.isYellow; }
        
        isColored() {
          return this.isRed || this.isBlue || this.isGreen || this.isYellow;
        }
      }

      class Grid {
        constructor(gridSize, canvasSize) {
          this.gridSize = gridSize;
          this.cubeSize = canvasSize / gridSize;
          this.grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
        }

        initPrintGridLayout() {
          for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
              let currCube = new Cube(this.cubeSize);

              if (i === 0 && j === 0) {
                currCube.setColor1(255);
                currCube.setColor2(0);
                currCube.setColor3(0);
                currCube.setIsRed(true);
                currCube.setX(0);
                currCube.setY(0);
              } else if (i === 9 && j === 0) {
                currCube.setColor1(0);
                currCube.setColor2(255);
                currCube.setColor3(0);
                currCube.setIsGreen(true);
                currCube.setX(0);
                currCube.setY(9);
              } else if (i === 0 && j === 9) {
                currCube.setColor1(0);
                currCube.setColor2(0);
                currCube.setColor3(255);
                currCube.setIsBlue(true);
                currCube.setX(9);
                currCube.setY(0);
              } else if (i === 9 && j === 9) {
                currCube.setColor1(255);
                currCube.setColor2(255);
                currCube.setColor3(0);
                currCube.setIsYellow(true);
                currCube.setX(9);
                currCube.setY(9);
              } else {
                currCube.setColor1(0);
                currCube.setColor2(0);
                currCube.setColor3(0);
                currCube.setIsWhite(true);
                currCube.setX(i);
                currCube.setY(j);
              }
              
              this.grid[i][j] = currCube;
              currCube.printCube(i * currCube.getDims(), j * currCube.getDims());
            }
          }
        }

        changeStateOfBoard() {
          let numRows = this.grid.length;
          let numCols = this.grid[0].length;
          
          let redCount = this.getRedCount();
          let blueCount = this.getBlueCount();
          let greenCount = this.getGreenCount();
          let yellowCount = this.getYellowCount();
          
          let tempGrid = Array(numRows).fill().map(() => Array(numCols).fill(null));
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              tempGrid[i][j] = new Cube(this.cubeSize);
              tempGrid[i][j].setIsRed(this.grid[i][j].getIsRed());
              tempGrid[i][j].setIsGreen(this.grid[i][j].getIsGreen());
              tempGrid[i][j].setIsBlue(this.grid[i][j].getIsBlue());
              tempGrid[i][j].setIsYellow(this.grid[i][j].getIsYellow());
              tempGrid[i][j].setColor1(this.grid[i][j].getColor1());
              tempGrid[i][j].setColor2(this.grid[i][j].getColor2());
              tempGrid[i][j].setColor3(this.grid[i][j].getColor3());
            }
          }
          
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              if (redCount > 0 && this.grid[i][j].getIsRed() && i < numRows - 1 && j < numCols - 1) {
                if(this.grid[i + 1][j].getIsWhite() && !this.grid[i + 1][j].isColored()) {
                  tempGrid[i + 1][j].setIsRed(true);
                  tempGrid[i + 1][j].setColor1(255);
                  tempGrid[i + 1][j].setColor2(0);
                  tempGrid[i + 1][j].setColor3(0);
                }
                if(this.grid[i][j + 1].getIsWhite() && !this.grid[i][j + 1].isColored()) {
                  tempGrid[i][j + 1].setIsRed(true);
                  tempGrid[i][j + 1].setColor1(255);
                  tempGrid[i][j + 1].setColor2(0);
                  tempGrid[i][j + 1].setColor3(0);
                }
              }
              
              if (blueCount > 0 && this.grid[i][j].getIsBlue() && i < numRows - 1 && j > 0) {
                if(this.grid[i + 1][j].getIsWhite() && !this.grid[i + 1][j].isColored()) {
                  tempGrid[i + 1][j].setIsBlue(true);
                  tempGrid[i + 1][j].setColor1(0);
                  tempGrid[i + 1][j].setColor2(0);
                  tempGrid[i + 1][j].setColor3(255);
                }
                if(this.grid[i][j - 1].getIsWhite() && !this.grid[i][j - 1].isColored()) {
                  tempGrid[i][j - 1].setIsBlue(true);
                  tempGrid[i][j - 1].setColor1(0);
                  tempGrid[i][j - 1].setColor2(0);
                  tempGrid[i][j - 1].setColor3(255);
                }
              }
              
              if (greenCount > 0 && this.grid[i][j].getIsGreen() && i > 0 && j < numCols - 1) {
                if(this.grid[i - 1][j].getIsWhite() && !this.grid[i - 1][j].isColored()) {
                  tempGrid[i - 1][j].setIsGreen(true);
                  tempGrid[i - 1][j].setColor1(0);
                  tempGrid[i - 1][j].setColor2(255);
                  tempGrid[i - 1][j].setColor3(0);
                }
                if(this.grid[i][j + 1].getIsWhite() && !this.grid[i][j + 1].isColored()) {
                  tempGrid[i][j + 1].setIsGreen(true);
                  tempGrid[i][j + 1].setColor1(0);
                  tempGrid[i][j + 1].setColor2(255);
                  tempGrid[i][j + 1].setColor3(0);
                }
              }
              
              if (yellowCount > 0 && this.grid[i][j].getIsYellow() && i > 0 && j > 0) {
                if(this.grid[i - 1][j].getIsWhite() && !this.grid[i - 1][j].isColored()) {
                  tempGrid[i - 1][j].setIsYellow(true);
                  tempGrid[i - 1][j].setColor1(255);
                  tempGrid[i - 1][j].setColor2(255);
                  tempGrid[i - 1][j].setColor3(0);
                }
                if(this.grid[i][j - 1].getIsWhite() && !this.grid[i][j - 1].isColored()) {
                  tempGrid[i][j - 1].setIsYellow(true);
                  tempGrid[i][j - 1].setColor1(255);
                  tempGrid[i][j - 1].setColor2(255);
                  tempGrid[i][j - 1].setColor3(0);
                }
              }
            }
          }
          
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              this.grid[i][j].setIsRed(tempGrid[i][j].getIsRed());
              this.grid[i][j].setIsGreen(tempGrid[i][j].getIsGreen());
              this.grid[i][j].setIsBlue(tempGrid[i][j].getIsBlue());
              this.grid[i][j].setIsYellow(tempGrid[i][j].getIsYellow());
              this.grid[i][j].setColor1(tempGrid[i][j].getColor1());
              this.grid[i][j].setColor2(tempGrid[i][j].getColor2());
              this.grid[i][j].setColor3(tempGrid[i][j].getColor3());
            }
          }
          
          this.printCurrGrid();
        }

        fight() {
          let numRows = this.grid.length;
          let numCols = this.grid[0].length;
          
          let redCount = 0;
          let blueCount = 0;
          let greenCount = 0;
          let yellowCount = 0;
          
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              if (this.grid[i][j].getIsRed()) redCount++;
              else if (this.grid[i][j].getIsBlue()) blueCount++;
              else if (this.grid[i][j].getIsGreen()) greenCount++;
              else if (this.grid[i][j].getIsYellow()) yellowCount++;
            }
          }
          
          let activeColors = [];
          if (redCount > 0) activeColors.push(1);
          if (blueCount > 0) activeColors.push(2);
          if (greenCount > 0) activeColors.push(3);
          if (yellowCount > 0) activeColors.push(4);
          
          let rando = 0;
          if (activeColors.length > 0) {
            rando = activeColors[Math.floor(p.random(0, activeColors.length))];
          }
          
          let tempGrid = Array(numRows).fill().map(() => Array(numCols).fill(null));
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              tempGrid[i][j] = new Cube(this.cubeSize);
              tempGrid[i][j].setIsRed(this.grid[i][j].getIsRed());
              tempGrid[i][j].setIsGreen(this.grid[i][j].getIsGreen());
              tempGrid[i][j].setIsBlue(this.grid[i][j].getIsBlue());
              tempGrid[i][j].setIsYellow(this.grid[i][j].getIsYellow());
              tempGrid[i][j].setColor1(this.grid[i][j].getColor1());
              tempGrid[i][j].setColor2(this.grid[i][j].getColor2());
              tempGrid[i][j].setColor3(this.grid[i][j].getColor3());
            }
          }
          
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              if(redCount > 0 && rando === 1) {
                if (this.grid[i][j].getIsRed() && i < numRows - 1 && j < numCols - 1) {
                  if(this.grid[i + 1][j].isColored() && !this.grid[i + 1][j].getIsRed()) {
                    tempGrid[i + 1][j].setAllToFalse();
                    tempGrid[i + 1][j].setIsRed(true);
                    tempGrid[i + 1][j].setColor1(255);
                    tempGrid[i + 1][j].setColor2(0);
                    tempGrid[i + 1][j].setColor3(0);
                  }
                  if(this.grid[i][j + 1].isColored() && !this.grid[i][j + 1].getIsRed()) {
                    tempGrid[i][j + 1].setAllToFalse();
                    tempGrid[i][j + 1].setIsRed(true);
                    tempGrid[i][j + 1].setColor1(255);
                    tempGrid[i][j + 1].setColor2(0);
                    tempGrid[i][j + 1].setColor3(0);
                  }
                  
                  if (redCount === 99 && i + 1 < numRows && j + 1 < numCols && this.grid[i + 1][j + 1].isColored() && !this.grid[i + 1][j + 1].getIsRed()) {
                    tempGrid[i + 1][j + 1].setAllToFalse();
                    tempGrid[i + 1][j + 1].setIsRed(true);
                    tempGrid[i + 1][j + 1].setColor1(255);
                    tempGrid[i + 1][j + 1].setColor2(0);
                    tempGrid[i + 1][j + 1].setColor3(0);
                  }
                }
              }
              
              if(blueCount > 0 && rando === 2) {
                if (this.grid[i][j].getIsBlue() && i < numRows - 1 && j > 0) {
                  if(this.grid[i][j - 1].isColored() && !this.grid[i][j - 1].getIsBlue()) {
                    tempGrid[i][j - 1].setAllToFalse();
                    tempGrid[i][j - 1].setIsBlue(true);
                    tempGrid[i][j - 1].setColor1(0);
                    tempGrid[i][j - 1].setColor2(0);
                    tempGrid[i][j - 1].setColor3(255);
                  }
                  if(this.grid[i + 1][j].isColored() && !this.grid[i + 1][j].getIsBlue()) {
                    tempGrid[i + 1][j].setAllToFalse();
                    tempGrid[i + 1][j].setIsBlue(true);
                    tempGrid[i + 1][j].setColor1(0);
                    tempGrid[i + 1][j].setColor2(0);
                    tempGrid[i + 1][j].setColor3(255);
                  }
                  
                  if (blueCount === 99 && i + 1 < numRows && j - 1 >= 0 && this.grid[i + 1][j - 1].isColored() && !this.grid[i + 1][j - 1].getIsBlue()) {
                    tempGrid[i + 1][j - 1].setAllToFalse();
                    tempGrid[i + 1][j - 1].setIsBlue(true);
                    tempGrid[i + 1][j - 1].setColor1(0);
                    tempGrid[i + 1][j - 1].setColor2(0);
                    tempGrid[i + 1][j - 1].setColor3(255);
                  }
                }
              }
              
              if(greenCount > 0 && rando === 3) {
                if (this.grid[i][j].getIsGreen() && i > 0 && j < numCols - 1) {
                  if(this.grid[i - 1][j].isColored() && !this.grid[i - 1][j].getIsGreen()) {
                    tempGrid[i - 1][j].setAllToFalse();
                    tempGrid[i - 1][j].setIsGreen(true);
                    tempGrid[i - 1][j].setColor1(0);
                    tempGrid[i - 1][j].setColor2(255);
                    tempGrid[i - 1][j].setColor3(0);
                  }
                  if(this.grid[i][j + 1].isColored() && !this.grid[i][j + 1].getIsGreen()) {
                    tempGrid[i][j + 1].setAllToFalse();
                    tempGrid[i][j + 1].setIsGreen(true);
                    tempGrid[i][j + 1].setColor1(0);
                    tempGrid[i][j + 1].setColor2(255);
                    tempGrid[i][j + 1].setColor3(0);
                  }
                  
                  if (greenCount === 99 && i - 1 >= 0 && j + 1 < numCols && this.grid[i - 1][j + 1].isColored() && !this.grid[i - 1][j + 1].getIsGreen()) {
                    tempGrid[i - 1][j + 1].setAllToFalse();
                    tempGrid[i - 1][j + 1].setIsGreen(true);
                    tempGrid[i - 1][j + 1].setColor1(0);
                    tempGrid[i - 1][j + 1].setColor2(255);
                    tempGrid[i - 1][j + 1].setColor3(0);
                  }
                }
              }
              
              if(yellowCount > 0 && rando === 4) {
                if (this.grid[i][j].getIsYellow() && i > 0 && j > 0) {
                  if(this.grid[i][j - 1].isColored() && !this.grid[i][j - 1].getIsYellow()) {
                    tempGrid[i][j - 1].setAllToFalse();
                    tempGrid[i][j - 1].setIsYellow(true);
                    tempGrid[i][j - 1].setColor1(255);
                    tempGrid[i][j - 1].setColor2(255);
                    tempGrid[i][j - 1].setColor3(0);
                  }
                  if(this.grid[i - 1][j].isColored() && !this.grid[i - 1][j].getIsYellow()) {
                    tempGrid[i - 1][j].setAllToFalse();
                    tempGrid[i - 1][j].setIsYellow(true);
                    tempGrid[i - 1][j].setColor1(255);
                    tempGrid[i - 1][j].setColor2(255);
                    tempGrid[i - 1][j].setColor3(0);
                  }
                  
                  if (yellowCount === 99 && i - 1 >= 0 && j - 1 >= 0 && this.grid[i - 1][j - 1].isColored() && !this.grid[i - 1][j - 1].getIsYellow()) {
                    tempGrid[i - 1][j - 1].setAllToFalse();
                    tempGrid[i - 1][j - 1].setIsYellow(true);
                    tempGrid[i - 1][j - 1].setColor1(255);
                    tempGrid[i - 1][j - 1].setColor2(255);
                    tempGrid[i - 1][j - 1].setColor3(0);
                  }
                }
              }
            }
          }
          
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              this.grid[i][j].setIsRed(tempGrid[i][j].getIsRed());
              this.grid[i][j].setIsGreen(tempGrid[i][j].getIsGreen());
              this.grid[i][j].setIsBlue(tempGrid[i][j].getIsBlue());
              this.grid[i][j].setIsYellow(tempGrid[i][j].getIsYellow());
              this.grid[i][j].setColor1(tempGrid[i][j].getColor1());
              this.grid[i][j].setColor2(tempGrid[i][j].getColor2());
              this.grid[i][j].setColor3(tempGrid[i][j].getColor3());
            }
          }
          
          this.printCurrGrid();
        }

        getRedCount() {
          let count = 0;
          for (let row of this.grid) {
            for (let cube of row) {
              if (cube.getIsRed()) count++;
            }
          }
          return count;
        }

        getBlueCount() {
          let count = 0;
          for (let row of this.grid) {
            for (let cube of row) {
              if (cube.getIsBlue()) count++;
            }
          }
          return count;
        }

        getGreenCount() {
          let count = 0;
          for (let row of this.grid) {
            for (let cube of row) {
              if (cube.getIsGreen()) count++;
            }
          }
          return count;
        }

        getYellowCount() {
          let count = 0;
          for (let row of this.grid) {
            for (let cube of row) {
              if (cube.getIsYellow()) count++;
            }
          }
          return count;
        }

        printCurrGrid() {
          for (let i = 0; i < this.grid.length; i++) {
            for (let j = 0; j < this.grid[0].length; j++) {
              this.grid[i][j].printCube(i * this.grid[i][j].getDims(), j * this.grid[i][j].getDims());
            }
          }
        }
      }

      let currGrid;
      let counter = 0;
      let frameCounter = 0;

      p.setup = () => {
        const size = Math.min(500, window.innerWidth - 40);
        p.createCanvas(size, size);
        p.background(0);
        currGrid = new Grid(10, size);
        currGrid.initPrintGridLayout();
      };

      p.draw = () => {
        frameCounter++;
        if (frameCounter % 33 !== 0) return;
        
        if (counter < 9) {
          currGrid.changeStateOfBoard();
        } else if (counter >= 9) {
          let redCount = currGrid.getRedCount();
          let blueCount = currGrid.getBlueCount();
          let greenCount = currGrid.getGreenCount();
          let yellowCount = currGrid.getYellowCount();
          
          if (redCount === 100 || blueCount === 100 || greenCount === 100 || yellowCount === 100) {
            p.noLoop();
            setIsRunning(false);
            
            const textSize = p.width > 400 ? 48 : 32;
            p.textSize(textSize);
            p.textAlign(p.CENTER);
            p.fill(255);
            p.stroke(0);
            p.strokeWeight(3);
            
            let winnerText = '';
            if (redCount === 100) {
              winnerText = 'Red wins!';
              setWinner('Red');
            } else if (blueCount === 100) {
              winnerText = 'Blue wins!';
              setWinner('Blue');
            } else if (greenCount === 100) {
              winnerText = 'Green wins!';
              setWinner('Green');
            } else if (yellowCount === 100) {
              winnerText = 'Yellow wins!';
              setWinner('Yellow');
            }
            p.text(winnerText, p.width / 2, p.height / 2);
          } else {
            currGrid.fight();
          }
        }
        counter++;
      };
    };

    if (sketchRef.current) {
      p5Instance.current = new p5(sketch, sketchRef.current);
    }

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
    };
  }, [resetKey]);

  const handleRestart = () => {
    setWinner(null);
    setIsRunning(true);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={sketchRef} className="border-2 sm:border-4 border-black rounded-lg shadow-2xl max-w-full"></div>
      <div className="mt-3 sm:mt-4 text-center">
        <button 
          onClick={handleRestart}
          disabled={!winner}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base text-white rounded-lg font-medium transition-all ${
            winner 
              ? 'bg-black hover:bg-gray-800 cursor-pointer' 
              : 'bg-gray-400 cursor-not-allowed opacity-50'
          }`}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}

function RevealOnScroll({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
}

function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed && videoRef.current) {
          videoRef.current.play()
            .then(() => {
              setHasPlayed(true);
            })
            .catch((error) => {
              console.log("Autoplay failed:", error);
            });
        }
      },
      { threshold: 0.5 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <video 
      ref={videoRef}
      src={src}
      className="w-full h-[380px] md:h-[550px] lg:h-[650px] object-cover"
      controls
      loop
    />
  );
}

function MoreProjects({ currentProjectId }) {
  const moreProjects = getRandomProjects(currentProjectId, 3);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <section className="w-full pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border-t border-gray-200 pt-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-8">
            More Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {moreProjects.map((project) => (
              <Link
                key={project.id}
                to={project.url}
                className="group block bg-white rounded-lg shadow hover:shadow-xl transition-shadow overflow-hidden"
                onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              >
                {isMobile ? (
                  <div className="relative w-full overflow-hidden" style={{ paddingTop: '66.67%' }}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 md:h-56 lg:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-purple-700 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ColorContest() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().then(() => {
        video.muted = false;
      }).catch((error) => {
        console.log("Autoplay with sound was prevented:", error);
      });
    }
  }, []);

  return (
    <section className="min-h-screen bg-white">
      <div className="bg-gray-100 pt-24 sm:pt-16 pb-10 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-red-500 leading-tight">
                Color Contest
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                An interactive color contest where viewers can vote for a color as they compete for the space.
              </p>
              <a
                href="https://github.com/aspentabar/ColorContest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                View on Github
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="text-blue-600 uppercase font-bold tracking-wider text-xs md:text-sm">Role</p>
                <p className="text-neutral-950 text-sm md:text-base">Creative Coder</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-green-500 uppercase font-bold tracking-wider text-xs md:text-sm">Focus</p>
                <p className="text-neutral-950 text-sm md:text-base">Game Design, User Experience</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-yellow-400 uppercase font-bold tracking-wider text-xs md:text-sm">Tools</p>
                <p className="text-neutral-950 text-sm md:text-base">p5.js</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        <RevealOnScroll>
          <div className="mb-20 md:mb-36 -mx-0 sm:-mx-6 lg:-mx-12">
            <div className="flex flex-col items-center">
              <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Demo
              </div>
              <ColorContestSketch />
            </div>
          </div>
        </RevealOnScroll>

        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 md:mb-6">Overview</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    Color Contest is an animation where four colors – Red, Blue, Green, and Yellow – have an intense contest for dominance over the shared space. Each color starts from its own corner and gradually expands towards the center. Once all colors have reached the center, they begin to interact! Some colors will grow, while others will shrink. You can vote for your favorite and watch the colors compete over the space. Every game produces a different outcome, making each contest unique and unpredictable.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 md:mb-6">Design & Development</h2>
              <div className="max-w-2xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  Color Contest was originally created as a simple 10x10 grid animation for computer screens, exploring how colors could compete for space in a confined digital environment. The initial prototype focused on the core mechanics of expansion and territorial conflict between the four colors, running as a p5.js sketch.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-4">
                  The project underwent significant development when it was selected for display on the Ars Electronica facade, transforming from a personal coding experiment into a large-scale public installation.
                </p>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex justify-center">
                  <img 
                    src={color1}
                    alt="Original Color Contest on computer" 
                    className="w-3/4 md:w-4/5 h-auto rounded-lg"
                  />
                </div>
                <div className="flex justify-center items-center h-full">
                  <img 
                    src={ars9}
                    alt="Color Contest on Ars Electronica facade" 
                    className="w-full md:w-[110%] h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">Final Exhibition</h2>
                <div className="mb-6">
                  <a
                    href="https://ars.electronica.art/futurelab/en/projects-northeastern-university-2023/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
                  >
                    View on Ars Electronica
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    Color Contest was presented on the Ars Electronica facade in Linz, Austria, transforming the building into a massive canvas. In the video below, you can hear the crowd actively voting for their favorite colors through cheering!
                  </p>
                </div>
                <div className="mt-16 md:mt-24 space-y-4 md:space-y-6">
                  <div className="flex justify-center">
                    <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl w-full md:w-[85%] lg:w-4/5">
                      <VideoPlayer src={colorVideo} />
                    </div>
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      <MoreProjects currentProjectId="ColorContest" />
    </section>
  );
}