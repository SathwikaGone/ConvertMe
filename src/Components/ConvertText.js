import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./Speech.css";

const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRec();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";

export default function ConvertText() {
  const [note, setNote] = useState(`Type with your voice.`);
  const [noteStyle, setNoteStyle] = useState(true);
  const [isListening, setisListening] = useState(false);
  const [savedNotes, setisSavedNotes] = useState([]);

  useEffect(() => {
    handleListen();
  }, [isListening]);

  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log("continue");
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log("stopped mic");
      };
    }

    mic.onstart = () => {
      console.log(" mic on");
    };

    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      console.log("transcript", transcript);
      setNote(transcript);
      mic.onerror = (event) => {
        console.log("error", event.error);
      };
    };
  };

  const handleSaveNote = () => {
    setisSavedNotes([...savedNotes, note]);
    setNote("");
  };
  return (
    <div>
      <div className="card">
        {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}

        <div className="cardHeader">
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Italic"
            style={{
              float: "left",
            }}
            defaultChecked
            onClick={() => setNoteStyle((prev) => !prev)}
          />
          <button disabled={!note} onClick={handleSaveNote}>
            Save Notes
          </button>
          <button onClick={() => setisListening((prev) => !prev)}>
            Start/Stop
          </button>
        </div>
        <textarea
          value={note}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            fontStyle: noteStyle ? "italic" : "normal",
          }}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <h2>Notes</h2>
      {savedNotes.map((item, index) => (
        <div key={index} className="card">
          {item}
        </div>
      ))}
    </div>
  );
}
