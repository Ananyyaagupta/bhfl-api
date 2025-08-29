export default function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body.data || [];

    const FULL_NAME = "ananya_gupta";  // change to your name
    const DOB = "ddmmyyyy";            // change to your DOB
    const EMAIL = "your_email@xyz.com";
    const ROLL_NUMBER = "YOURROLLNO";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    const isNumber = (str) => /^\d+$/.test(str);

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

    const concat_string = alphabets
      .join("")
      .split("")
      .reverse()
      .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

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
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
