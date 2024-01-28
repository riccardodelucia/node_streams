const Stream = require("stream");
const controller = new AbortController();
const { signal } = controller;

const createReadableStream = () => {
  const readData = [1, 2, 3, 4];

  return new Stream.Readable({
    objectMode: true,
    signal,
    read() {
      if (readData.length) {
        this.push(readData.shift());
      } else this.push(null);
      return;
    },
  });
};

const readableStream = createReadableStream();

const buffer = readableStream.readableBuffer;

readableStream.on("data", (data) => {
  console.log("\n\ndata callback");
  console.log("\tData chunk:", data);
  if (data === 1) {
    controller.abort();
  }
});

readableStream.on("error", (err) => {
  console.log("error on stream!");
  console.log(err);
  console.log("\nscript finished\n\n\n");
});

readableStream.on("end", () => {
  console.log("\n\nend callback");
  console.log("\tbuffer: ", buffer);
  console.log("\n\n");
});

console.log("\n\nBuffer before reading: ", buffer);
