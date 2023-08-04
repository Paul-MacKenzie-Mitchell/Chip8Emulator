const MEMORY_SIZE = 4096;
const NUM_REGISTERS = 16;

class Chip8 {
  constructor(monitor) {
    this.memory = new Unit8Array(MEMORY_SIZE); //theoretical RAM

    this.v = new Unit8Array(NUM_REGISTERS); //registers

    this.index = 0; //sixteen bit index register

    this.pc = 0x200; // sixteen bit programm count register (pointer to line of code being executed)
    //first position by specs is 0x200

    this.stack = []; //

    this.sp = 0; //8 bit stack point register

    this.delayTimer = 0;

    this.soundTimer = 0;

    //Keyboard

    this.monitor = monitor;

    this.paused = false;
    this.speed = 10;
  }

  interpretInstruction(instruction) {
    this.pc += 2;

    let x = (instruction & 0x0ff00) >> 8;
    let y = (instruction & 0x00f0) >> 4;

    switch (instruction & 0xf000) {
      case 0x0000:
        switch (instruction) {
          case 0x00e0: //CLR
            this.monitor.clear();
            break;
          case 0x0ee: //RET
            this.pc = this.stack.pop();
            break;
        }
        break;
      case 0x1000: //jump to location nnn
        this.pc = instruction & 0xfff; // JP addr
        break;
      case 0x2000: //CALL adr
        this.stack.push(this.pc);
        this.pc = instruction & 0xfff;
        break;
      case 0x3000:
        if (this.v[x] === (instruction & 0xff)) {
          this.pc += 2; //jump next value
        }
        break;
      case 0x5000:
        if (this.v[x] === this.v[y]) {
          this.pc += 2;
        }
        break;
      case 0x6000: //LD Vx, byte
        this.v[x] = instruction & 0xff;
        break;
      case 0x7000: //ADD Vx, byte
        this.v[x] += instruction & 0xff;
        break;
      case 0x8000:
        switch (instruction & 0xf) {
          case 0x0:
        }
    }
  }
}

export default Chip8;
