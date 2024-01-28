const { Writable } = require("stream");

const writableStream = new Writable({
  objectMode: true,
  write(chunk, enc, next) {
    console.log("\tWrite method called");
    console.log("\t\tbuffer: ", this.writableBuffer);
    console.log("\t\tData chunk: ", chunk);
    next();
  },
});

const buffer = writableStream.writableBuffer;

writableStream.on("finish", () => {
  console.log("\n\nfinish event callback");
  console.log("\tbuffer", buffer);
  console.log("\n\n\n");
});

console.log("\n\nBuffer before any writing: ", buffer);

console.log("\n\ncalling write(1)");
writableStream.write(1);

console.log("\n\ncalling write(2)");
writableStream.write(2);

console.log("\n\n!!!!!!!calling cork method!!!!!!\n\n");
writableStream.cork();

console.log("\n\ncalling write(3)");
writableStream.write(3);

console.log("\n\ncalling write(4)");
writableStream.write(4);

console.log("\n\ncalling end(5)");
writableStream.end(5);
console.log("\n\nBuffer at the end of writing: ", buffer);
