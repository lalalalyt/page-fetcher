const request = require("request");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
request(process.argv[2], (error1, response, body) => {
  if (error1) {
    console.log("Failed to download resource: ", error);
    rl.close();
  }
  fs.access(process.argv[3], fs.constants.F_OK, (error) => {
    if (!error) {
      rl.question(
        "Already exist. Do you want to overwrite it? Y/N  ",
        (answer) => {
          if (answer === "Y" || answer === "y") {
            fs.writeFile(process.argv[3], body, (error2) => {
              if (error2) {
                console.log("Failed to write to localPath: ", process.argv[3]);
              } else {
                console.log(
                  `Downloaded and saved ${body.length} bytes to ${process.argv[3]}`
                );
              }
            });
          }
          rl.close();
        }
      );
    } else {
      fs.writeFile(process.argv[3], body, (error2) => {
        if (error2) {
          console.log("Failed to write to localPath: ", process.argv[3]);
          rl.close();
        } else {
          console.log(
            `Downloaded and saved ${body.length} bytes to ${process.argv[3]}`
          );
          rl.close();
        }
      });
    }
  });
});
