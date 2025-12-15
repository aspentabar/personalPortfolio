import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { featuredProjects, getRandomProjects } from '../Projects'; // Adjust path as needed
import p5 from 'p5'; // You'll need to install this: npm install p5

// P5.js Color Contest Sketch Component
function ColorContestSketch() {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);
  const [winner, setWinner] = useState(null);
  const [isRunning, setIsRunning] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Clean up any existing instance first
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }

    // Only create sketch if container exists and we haven't initialized yet
    if (!sketchRef.current) return;
    
    // Add a small delay to ensure DOM is ready
    const initTimeout = setTimeout(() => {
      if (isInitialized) return;
      
      const sketch = (p) => {
        // Cube class
        class Cube {
          constructor() {
            this.x = 0;
            this.y = 0;
            this.dims = 50;
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

        // Grid class
        class Grid {
          constructor(gridSize) {
            this.gridSize = gridSize;
            this.grid = Array(gridSize).fill().map(() => Array(gridSize).fill(null));
          }

          initPrintGridLayout() {
            for (let i = 0; i < this.gridSize; i++) {
              for (let j = 0; j < this.gridSize; j++) {
                let currCube = new Cube();

                if (i === 0 && j === 0) {
                  // Red
                  currCube.setColor1(255);
                  currCube.setColor2(0);
                  currCube.setColor3(0);
                  currCube.setIsRed(true);
                  currCube.setX(0);
                  currCube.setY(0);
                } else if (i === 9 && j === 0) {
                  // Green
                  currCube.setColor1(0);
                  currCube.setColor2(255);
                  currCube.setColor3(0);
                  currCube.setIsGreen(true);
                  currCube.setX(0);
                  currCube.setY(9);
                } else if (i === 0 && j === 9) {
                  // Blue
                  currCube.setColor1(0);
                  currCube.setColor2(0);
                  currCube.setColor3(255);
                  currCube.setIsBlue(true);
                  currCube.setX(9);
                  currCube.setY(0);
                } else if (i === 9 && j === 9) {
                  // Yellow
                  currCube.setColor1(255);
                  currCube.setColor2(255);
                  currCube.setColor3(0);
                  currCube.setIsYellow(true);
                  currCube.setX(9);
                  currCube.setY(9);
                } else {
                  // White (black actually)
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
            
            // Temporary grid to store the updated states
            let tempGrid = Array(numRows).fill().map(() => Array(numCols).fill(null));
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                tempGrid[i][j] = new Cube();
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
                // Red
                if (this.grid[i][j].getIsRed() && i < numRows - 1 && j < numCols - 1) {
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
                
                // Blue
                if (this.grid[i][j].getIsBlue() && i < numRows - 1 && j > 0) {
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
                
                // Green
                if (this.grid[i][j].getIsGreen() && i > 0 && j < numCols - 1) {
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
                
                // Yellow
                if (this.grid[i][j].getIsYellow() && i > 0 && j > 0) {
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
            
            // Update the original grid
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
            let rando = Math.floor(p.random(1, 5));
            
            let redCount = 0;
            let blueCount = 0;
            let greenCount = 0;
            let yellowCount = 0;
            
            // Temporary grid
            let tempGrid = Array(numRows).fill().map(() => Array(numCols).fill(null));
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                tempGrid[i][j] = new Cube();
                tempGrid[i][j].setIsRed(this.grid[i][j].getIsRed());
                tempGrid[i][j].setIsGreen(this.grid[i][j].getIsGreen());
                tempGrid[i][j].setIsBlue(this.grid[i][j].getIsBlue());
                tempGrid[i][j].setIsYellow(this.grid[i][j].getIsYellow());
                tempGrid[i][j].setColor1(this.grid[i][j].getColor1());
                tempGrid[i][j].setColor2(this.grid[i][j].getColor2());
                tempGrid[i][j].setColor3(this.grid[i][j].getColor3());
                
                // Update counters
                if (this.grid[i][j].getIsRed()) redCount++;
                else if (this.grid[i][j].getIsBlue()) blueCount++;
                else if (this.grid[i][j].getIsGreen()) greenCount++;
                else if (this.grid[i][j].getIsYellow()) yellowCount++;
              }
            }
            
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                // Red fighting logic
                if(redCount > 0) {
                  if (this.grid[i][j].getIsRed() && i < numRows - 1 && j < numCols - 1) {
                    if (rando === 1) {
                      if(this.grid[i + 1][j].isColored() && this.grid[i][j + 1].isColored()) {
                        tempGrid[i + 1][j].setAllToFalse();
                        tempGrid[i + 1][j].setIsRed(true);
                        tempGrid[i + 1][j].setColor1(255);
                        tempGrid[i + 1][j].setColor2(0);
                        tempGrid[i + 1][j].setColor3(0);

                        tempGrid[i][j + 1].setAllToFalse();
                        tempGrid[i][j + 1].setIsRed(true);
                        tempGrid[i][j + 1].setColor1(255);
                        tempGrid[i][j + 1].setColor2(0);
                        tempGrid[i][j + 1].setColor3(0);
                      }
                    }
                    
                    if (redCount === 99 && i + 1 < numRows && j + 1 < numCols && this.grid[i + 1][j + 1].isColored()) {
                      tempGrid[i + 1][j + 1].setAllToFalse();
                      tempGrid[i + 1][j + 1].setIsRed(true);
                      tempGrid[i + 1][j + 1].setColor1(255);
                      tempGrid[i + 1][j + 1].setColor2(0);
                      tempGrid[i + 1][j + 1].setColor3(0);
                    }
                  }
                }
                
                // Blue fighting logic
                if(blueCount > 0) {
                  if (this.grid[i][j].getIsBlue() && i < numRows - 1 && j > 0) {
                    if (rando === 2) {
                      if(this.grid[i][j - 1].isColored() && this.grid[i + 1][j].isColored()) {
                        tempGrid[i][j - 1].setAllToFalse();
                        tempGrid[i][j - 1].setIsBlue(true);
                        tempGrid[i][j - 1].setColor1(0);
                        tempGrid[i][j - 1].setColor2(0);
                        tempGrid[i][j - 1].setColor3(255);

                        tempGrid[i + 1][j].setAllToFalse();
                        tempGrid[i + 1][j].setIsBlue(true);
                        tempGrid[i + 1][j].setColor1(0);
                        tempGrid[i + 1][j].setColor2(0);
                        tempGrid[i + 1][j].setColor3(255);
                      }
                    }
                    
                    if (blueCount === 99 && i + 1 < numRows && j - 1 >= 0 && this.grid[i + 1][j - 1].isColored()) {
                      tempGrid[i + 1][j - 1].setAllToFalse();
                      tempGrid[i + 1][j - 1].setIsBlue(true);
                      tempGrid[i + 1][j - 1].setColor1(0);
                      tempGrid[i + 1][j - 1].setColor2(0);
                      tempGrid[i + 1][j - 1].setColor3(255);
                    }
                  }
                }
                
                // Green fighting logic
                if(greenCount > 0) {
                  if (this.grid[i][j].getIsGreen() && i > 0 && j < numCols - 1) {
                    if (rando === 3) {
                      if(this.grid[i - 1][j].isColored() && this.grid[i][j + 1].isColored()) {
                        tempGrid[i - 1][j].setAllToFalse();
                        tempGrid[i - 1][j].setIsGreen(true);
                        tempGrid[i - 1][j].setColor1(0);
                        tempGrid[i - 1][j].setColor2(255);
                        tempGrid[i - 1][j].setColor3(0);

                        tempGrid[i][j + 1].setAllToFalse();
                        tempGrid[i][j + 1].setIsGreen(true);
                        tempGrid[i][j + 1].setColor1(0);
                        tempGrid[i][j + 1].setColor2(255);
                        tempGrid[i][j + 1].setColor3(0);
                      }
                    }
                    
                    if (greenCount === 99 && i - 1 >= 0 && j + 1 < numCols && this.grid[i - 1][j + 1].isColored()) {
                      tempGrid[i - 1][j + 1].setAllToFalse();
                      tempGrid[i - 1][j + 1].setIsGreen(true);
                      tempGrid[i - 1][j + 1].setColor1(0);
                      tempGrid[i - 1][j + 1].setColor2(255);
                      tempGrid[i - 1][j + 1].setColor3(0);
                    }
                  }
                }
                
                // Yellow fighting logic
                if(yellowCount > 0) {
                  if (this.grid[i][j].getIsYellow() && i > 0 && j > 0) {
                    if (rando === 4) {
                      if(this.grid[i][j - 1].isColored() && this.grid[i - 1][j].isColored()) {
                        tempGrid[i][j - 1].setAllToFalse();
                        tempGrid[i][j - 1].setIsYellow(true);
                        tempGrid[i][j - 1].setColor1(255);
                        tempGrid[i][j - 1].setColor2(255);
                        tempGrid[i][j - 1].setColor3(0);
                      
                        tempGrid[i - 1][j].setAllToFalse();
                        tempGrid[i - 1][j].setIsYellow(true);
                        tempGrid[i - 1][j].setColor1(255);
                        tempGrid[i - 1][j].setColor2(255);
                        tempGrid[i - 1][j].setColor3(0);
                      }
                    }
                    
                    if (yellowCount === 99 && i - 1 >= 0 && j - 1 >= 0 && this.grid[i - 1][j - 1].isColored()) {
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
            
            // Update the original grid
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

        // Main sketch variables
        let currGrid;
        let counter = 0;
        let frameCounter = 0;

        p.setup = () => {
          p.createCanvas(500, 500);
          p.background(0);
          currGrid = new Grid(10);
          currGrid.initPrintGridLayout();
        };

        p.draw = () => {
          // Control speed with frame counter
          frameCounter++;
          if (frameCounter % 33 !== 0) return; // Approx 550ms at 60fps
          
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
              
              p.textSize(48);
              p.textAlign(p.CENTER);
              p.fill(255);
              p.stroke(0);
              p.strokeWeight(3);
              
              let winnerText = '';
              if (redCount === 100) {
                winnerText = 'Red won!';
                setWinner('Red');
              } else if (blueCount === 100) {
                winnerText = 'Blue won!';
                setWinner('Blue');
              } else if (greenCount === 100) {
                winnerText = 'Green won!';
                setWinner('Green');
              } else if (yellowCount === 100) {
                winnerText = 'Yellow won!';
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

      // Create the p5 instance only if container exists and no instance exists
      if (sketchRef.current && !p5Instance.current) {
        p5Instance.current = new p5(sketch, sketchRef.current);
        setIsInitialized(true);
      }
    }, 50);

    // Cleanup function
    return () => {
      clearTimeout(initTimeout);
      if (p5Instance.current) {
        p5Instance.current.remove();
        p5Instance.current = null;
      }
      setIsInitialized(false);
    };
  }, []); // Empty dependency array ensures this only runs once

  const handleRestart = () => {
    // Clean up the existing instance
    if (p5Instance.current) {
      p5Instance.current.remove();
      p5Instance.current = null;
    }
    
    // Reset states
    setWinner(null);
    setIsRunning(true);
    setIsInitialized(false);
    
    // Create a new instance
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={sketchRef} className="border-4 border-blue-600 rounded-lg shadow-2xl"></div>
      {winner && (
        <div className="mt-4 text-center">
          <p className="text-2xl font-bold text-blue-700 mb-2">{winner} Color Wins!</p>
          <button 
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
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

// Media Carousel Component
function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const carouselRef = useRef(null);
  
  // Media items configuration - REPLACE THESE WITH YOUR ACTUAL IMAGES/VIDEOS
  const mediaItems = [
    { type: 'image', src: 'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Design+1', alt: 'Design Process 1', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/7B68EE/FFFFFF?text=Design+2', alt: 'Design Process 2', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/6495ED/FFFFFF?text=Design+3', alt: 'Design Process 3', fullView: true },
    { type: 'image', src: 'https://via.placeholder.com/800x600/5B9BD5/FFFFFF?text=Design+4', alt: 'Design Process 4', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/4169E1/FFFFFF?text=Design+5', alt: 'Design Process 5', fullView: true },
    { type: 'image', src: 'https://via.placeholder.com/800x600/1E90FF/FFFFFF?text=Design+6', alt: 'Design Process 6', fullView: false },
    { type: 'image', src: 'https://via.placeholder.com/800x600/00BFFF/FFFFFF?text=Design+7', alt: 'Design Process 7', fullView: true }
  ];

  // Create extended array for infinite scroll effect
  const extendedItems = [...mediaItems, ...mediaItems, ...mediaItems];
  const offset = mediaItems.length;

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return mediaItems.length - 2;
      }
      return prevIndex - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= mediaItems.length - 2) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  // Detect when carousel enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          setHasBeenViewed(true);
        }
      },
      { threshold: 0.3 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, [hasBeenViewed]);

  // Auto-advance carousel after first view
  useEffect(() => {
    if (!isPaused && hasBeenViewed) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, hasBeenViewed]);

  // Calculate carousel translation
  const adjustedIndex = currentIndex + offset;
  const itemWidth = 50;
  const gapCompensation = 0.5;
  const translateX = -(adjustedIndex * itemWidth) + gapCompensation;

  return (
    <div ref={carouselRef}
         className="relative mt-12" 
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>
      <div className="flex items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          className="absolute -left-4 md:-left-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hidden sm:block"
          aria-label="Previous item"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Media Container */}
        <div className="w-full relative">
          <div className="w-full overflow-hidden rounded-lg">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(${translateX}% - 8px))`,
              }}
            >
              {extendedItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 px-1 md:px-2"
                  style={{ width: '50%' }}
                >
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className={`w-full h-[250px] md:h-[400px] rounded-lg ${
                        item.fullView ? 'object-contain bg-gray-50' : 'object-cover'
                      }`}
                    />
                  ) : (
                    <video
                      src={item.src}
                      className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-1 md:w-2 bg-white pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-1 md:w-2 bg-white pointer-events-none z-10"></div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute -right-4 md:-right-12 z-10 p-1.5 md:p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors hidden sm:block"
          aria-label="Next item"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 md:mt-6 gap-2">
        {mediaItems.map((_, index) => {
          let isActive = false;
          if (currentIndex === index || currentIndex === index - 1) {
            isActive = true;
          }
          if (currentIndex === mediaItems.length - 2 && index === mediaItems.length - 1) {
            isActive = true;
          }
          
          return (
            <button
              key={index}
              onClick={() => {
                if (index === mediaItems.length - 1) {
                  setCurrentIndex(mediaItems.length - 2);
                } else {
                  setCurrentIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? 'bg-blue-600 w-6' : 'bg-gray-300'
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}

// More Projects Component
function MoreProjects({ currentProjectId }) {
  const moreProjects = getRandomProjects(currentProjectId, 3);
  
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
                <div className="relative w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
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

// Main Component
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
      {/* Header Section */}
      <div className="bg-gray-100 pt-24 sm:pt-16 pb-10 md:pt-32 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-blue-700 leading-tight">
                Color Contest
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mb-6 md:mb-8">
                An interactive color competition game where players vote with their movement to determine winning colors.
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full font-medium transition-colors text-sm"
              >
                View Project
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

          {/* Information Grid */}
          <RevealOnScroll>
            <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Role</p>
                <p className="text-neutral-950 text-sm md:text-base">Creative Director & Developer</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Location</p>
                <p className="text-neutral-950 text-sm md:text-base">Boston, MA</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Platforms</p>
                <p className="text-neutral-950 text-sm md:text-base">Interactive Installation</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Focus</p>
                <p className="text-neutral-950 text-sm md:text-base">Visual Design & Interactivity</p>
              </div>
              <div className="flex flex-col items-start">
                <p className="text-blue-400 uppercase font-bold tracking-wider text-xs md:text-sm">Collaborators</p>
                <p className="text-neutral-950 text-sm md:text-base">Team Alpha, Beta Studios</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-16">
        {/* Main Color Contest Interactive Sketch */}
        <RevealOnScroll>
          <div className="mb-20 md:mb-36 -mx-0 sm:-mx-6 lg:-mx-12">
            <div className="flex justify-center">
              <ColorContestSketch />
            </div>
          </div>
        </RevealOnScroll>

        {/* Overview Section */}
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Overview</h2>
                <div className="space-y-4">
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    Color Contest represents an innovative approach to interactive media design, where participants become active creators in a collective visual experience. This project explores the intersection of human preference, real-time visualization, and collaborative art-making.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    The installation begins with a simple premise: colors compete for dominance based on audience preference. Through an intuitive interface, participants select their favorite colors in a series of head-to-head matchups. Each choice influences the overall visual composition, creating a dynamic artwork that evolves with every interaction. The system tracks voting patterns and generates stunning visual displays that reflect the collective aesthetic preferences of all participants.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    What makes Color Contest unique is its ability to transform abstract preferences into tangible visual experiences. The project demonstrates how simple user inputs can be orchestrated into complex, beautiful outcomes that surprise and delight audiences. By gamifying color selection and adding competitive elements, the installation creates an engaging experience that appeals to diverse audiences while producing genuinely artistic results.
                  </p>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* Project Context Section */}
      <div className="bg-gray-100 py-16 md:py-24 mb-16 md:mb-28 mt-16 md:mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <RevealOnScroll>
            <section>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Project Development</h2>
              <div className="max-w-2xl">
                <p className="text-sm md:text-base leading-relaxed text-gray-700">
                  This installation was developed as part of an innovative design residency focused on pushing the boundaries of interactive media. The project brought together designers, technologists, and artists to explore new forms of audience engagement.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 mt-4">
                  Over several weeks of intensive development, we prototyped various interaction models, tested different visual representations, and refined the competitive mechanics to create an experience that is both accessible to newcomers and engaging for repeat participants.
                </p>
              </div>
            </section>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="mt-12 md:mt-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Replace these with your actual images */}
                <img 
                  src="https://via.placeholder.com/800x600/6495ED/FFFFFF?text=Development+1" 
                  alt="Development Process" 
                  className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                />
                <img 
                  src="https://via.placeholder.com/800x600/4169E1/FFFFFF?text=Development+2" 
                  alt="Development Process" 
                  className="w-full h-[250px] md:h-[400px] rounded-lg object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="-mx-4 sm:-mx-6 lg:-mx-12">
          <div className="space-y-16 md:space-y-28">
            {/* Design & Development Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6">Design & Development</h2>
                <div className="max-w-2xl mb-16 md:mb-24">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The creative process began with extensive research into color theory, user psychology, and competitive game mechanics. We developed multiple prototypes using various technologies including web-based interfaces, physical installations, and projection mapping systems. Each iteration was tested with diverse user groups to ensure the experience remained intuitive while offering depth for those who wanted to explore further. The final implementation uses cutting-edge visualization techniques to create smooth, responsive animations that react instantly to user input.
                  </p>
                </div>
                <MediaCarousel />
              </section>
            </RevealOnScroll>

            {/* Final Presentation Section */}
            <RevealOnScroll>
              <section className="px-4 sm:px-6 lg:px-0">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-4 md:mb-6 mt-16 md:mt-20 lg:mt-32">Final Exhibition</h2>
                <div className="max-w-2xl">
                  <p className="text-sm md:text-base leading-relaxed text-gray-700">
                    The Color Contest premiered at a major design festival, attracting thousands of participants over the course of the event. Visitors were immediately drawn to the vibrant display and intuitive interaction model, with many returning multiple times to see how the collective artwork had evolved.
                  </p>
                </div>
                {/* Large presentation images */}
                <div className="mt-16 md:mt-24 space-y-4 md:space-y-6">
                  <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl">
                    {/* Replace with your actual image */}
                    <img 
                      src="https://via.placeholder.com/1200x675/4A90E2/FFFFFF?text=Final+Exhibition+1" 
                      alt="Final Exhibition 1" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl lg:rounded-2xl shadow-xl">
                    {/* Replace with your actual image */}
                    <img 
                      src="https://via.placeholder.com/1200x675/7B68EE/FFFFFF?text=Final+Exhibition+2" 
                      alt="Final Exhibition 2" 
                      className="w-full object-cover"
                      style={{ aspectRatio: '16/9' }}
                    />
                  </div>
                </div>
              </section>
            </RevealOnScroll>
          </div>
        </div>
      </div>

      {/* More Projects Section */}
      <MoreProjects currentProjectId="ColorContest" />
    </section>
  );
}