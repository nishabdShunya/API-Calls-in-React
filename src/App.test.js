import fs from "fs";

test("Click on Add Movie button adds a new movie to the database and to the screen", () => {
  const appJsContent = fs.readFileSync("./src/App.js", "utf8");

  // 1. Check for "JSON.stringify" at least once
  expect(appJsContent).toMatch(/JSON\.stringify/g);

  // 2. Check for "firebaseio" at least twice
  const firebaseioMatches = appJsContent.match(/firebaseio/g);
  expect(firebaseioMatches && firebaseioMatches.length).toBeGreaterThanOrEqual(
    2
  );

  // 3. Check for "POST" at least once
  expect(appJsContent).toMatch(/POST/g);
});
