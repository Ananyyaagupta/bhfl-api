const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "john_doe";   // change to your name in lowercase_underscores
const DOB = "17091999";         // change to your DOB ddmmyyyy
const EMAIL = "john@xyz.com";   // change to your email
const ROLL_NUMBER = "ABCD123";  // change to your roll number

// Function to check if a string is a number
const isNumber = (str) => /^\d+$/.test(str);

// Function for alternating caps in reverse order
const alternatingCapsReverse = (arr) => {
  let str = arr.join("");
  let reversed = str.split("").reverse().join("");
  return reversed
    .split("")
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
};

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach((item) => {
      if (isNumber(item)) {
        let num = parseInt(item);
        sum += num;
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    const concat_string = alternatingCapsReverse(alphabets);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
