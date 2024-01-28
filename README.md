# Node.js Streams Analysis

This project contains a bunch of tests on very basic readable/ writable streams, with the purpose of better understanding their behavior. Streams are notoriously hard to tackle and even harder to understand. By instantiating simple streams from `Writable` and `Readable`, and by inspecting their implementation, it is possible to get an insightful view on their inner mechanisms, which eventually enable a more confident way of working with them.

The official implementations for `Readable` and `Writable` are provided in the files `readable_source.js` and `writable_source.js`, respectively.
