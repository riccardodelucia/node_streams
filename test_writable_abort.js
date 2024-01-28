const { Writable } = require("stream");
const controller = new AbortController();
const { signal } = controller;

const writableStream = new Writable({
  objectMode: true,
  signal,
  write(chunk, enc, next) {
    console.log("\tWrite method called");
    console.log("\t\tData chunk: ", chunk);
    controller.abort();
    next();
  },
});

const buffer = writableStream.writableBuffer;

writableStream.on("finish", () => {
  console.log("\n\nfinish event callback");
  console.log("\tbuffer", buffer);
  console.log("\n\n\n");
});

writableStream.on("error", (err) => {
  console.log("error on stream!");
  console.log(err);
  console.log("\nscript finished\n\n\n");
});

console.log("writing data");
writableStream.write(1);

console.log("writing data");
writableStream.write(2);

console.log("writing data");
writableStream.write(3);

console.log("writing data");
writableStream.end(4);

console.log("\n\nBuffer at the end of writing: ", buffer);
