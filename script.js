body {
  font-family: Arial, sans-serif;
  background-color: #d0e8c5;
  text-align: center;
  margin: 0;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

form .options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
  justify-items: center;
}

form label {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}

form img {
  width: 100%;
  max-width: 200px;
  height: auto;
  border: 2px solid #ccc;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

form input[type="radio"] {
  display: none;
}

form input[type="radio"]:checked + img {
  border: 3px solid #2196f3;
  transform: scale(1.05);
}

button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytAfALtxL7Lbj-Z_WB8aIXC3yfob1AHYmcLqeEn0dovOVdQmEbDw3VJTYLHWFq4uXV/exec";

}
