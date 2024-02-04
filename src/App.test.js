import fs from "fs";

test("Click on cross button removes a movie from the database and the screen", () => {
  const appJsContent = fs.readFileSync("./src/App.js", "utf8");
  const firebaseioMatches = appJsContent.match(/firebaseio/g);
  expect(firebaseioMatches && firebaseioMatches.length).toBe(3);
  expect(appJsContent).toMatch(/DELETE/g);
});
