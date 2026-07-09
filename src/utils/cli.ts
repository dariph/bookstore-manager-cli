import * as readline from "readline";
import { Writable } from "stream";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askQuestion = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

export const closeCLI = () => rl.close();

export const askPassword = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    let muted = false;

    const mutedStdout = new Writable({
      write(chunk, encoding, callback) {
        if (!muted) process.stdout.write(chunk, encoding);
        callback();
      },
    });

    const rlPassword = readline.createInterface({
      input: process.stdin,
      output: mutedStdout,
      terminal: true,
    });

    process.stdout.write(question);
    muted = true;

    rlPassword.question("", (answer) => {
      muted = false;
      console.log();
      rlPassword.close();

      process.stdin.resume();

      resolve(answer.trim());
    });
  });
};
