const Stream = require("stream");

const createReadableStream = () => {
  const readData = [1, 2, 3, 4];

  return new Stream.Readable({
    objectMode: true,
    read() {
      console.log("\n\nread method called");
      console.log("\tbuffer: ", this.readableBuffer);
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
  console.log("\tbuffer: ", buffer);
});

readableStream.on("end", () => {
  console.log("\n\nend callback");
  console.log("\tbuffer: ", buffer);
  console.log("\n\n");
});

console.log("\n\nBuffer before reading: ", buffer);
