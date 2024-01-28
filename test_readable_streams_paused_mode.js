const Stream = require("stream");

const createReadableStream = () => {
  const readData = [1, 2, 3, 4];

  return new Stream.Readable({
    objectMode: true,
    read() {
      console.log("read method called");
      console.log("\tbuffer: ", this.readableBuffer);
      if (readData.length) {
        const data = readData.shift();
        console.log(`\tpushing ${data} into the buffer`);
        this.push(data);
      } else {
        console.log(`\tclosing the buffer with push(null)`);
        this.push(null);
      }
      console.log("end of read method");
      return;
    },
  });
};

const readableStream = createReadableStream();

const buffer = readableStream.readableBuffer;

readableStream.on("readable", () => {
  console.log("\n\n");
  console.log("readable callback (calling read())");
  let chunk;
  while ((chunk = readableStream.read()) !== null) {
    console.log("\tchunk: ", chunk);
    console.log("\tbuffer: ", buffer);
  }
  /* chunk = readableStream.read();
  console.log("\tchunk: ", chunk);
  console.log("\tbuffer: ", buffer); */
  console.log("end of readable callback\n\n");
});

readableStream.on("end", () => {
  console.log("\n\nend callback\n\n");
});

console.log("\n\nBuffer before reading: ", buffer);
