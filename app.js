import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post("https://your-backend-url/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (error) {
      alert("Invalid JSON or API error");
    }
  };

  const renderFilteredData = () => {
    if (!responseData) return null;

    let filteredData = {};
    if (selectedOptions.includes("Alphabets")) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest lowercase alphabet")) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }
    return (
      <pre>
        {JSON.stringify(filteredData, null, 2)}
      </pre>
    );
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        placeholder="Enter JSON input"
        value={jsonInput}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>

      {responseData && (
        <>
          <div>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={(e) =>
                  setSelectedOptions((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((opt) => opt !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={(e) =>
                  setSelectedOptions((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((opt) => opt !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                onChange={(e) =>
                  setSelectedOptions((prev) =>
                    prev.includes(e.target.value)
                      ? prev.filter((opt) => opt !== e.target.value)
                      : [...prev, e.target.value]
                  )
                }
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderFilteredData()}
        </>
      )}
    </div>
  );
}

export default App;
